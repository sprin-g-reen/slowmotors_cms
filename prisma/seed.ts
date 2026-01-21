import { PrismaClient } from '@prisma/client';
import he from 'he';

const prisma = new PrismaClient();
const WP_API_URL = 'https://slowmoto.tours/wp-json/wp/v2';

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  return res.json();
}

async function getMediaUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null;
  try {
    const media = await fetchJson(`${WP_API_URL}/media/${mediaId}`);
    return media.source_url || null;
  } catch (e) {
    console.error(`Failed to fetch media ${mediaId}`, e);
    return null;
  }
}

async function migratePosts() {
  console.log('Migrating Posts...');
  const posts = await fetchJson(`${WP_API_URL}/posts?per_page=100`);

  for (const post of posts) {
    console.log(`Processing post: ${post.slug}`);

    let coverImage = null;
    if (post.featured_media) {
      coverImage = await getMediaUrl(post.featured_media);
    }

    const title = he.decode(post.title.rendered);
    const content = post.content.rendered;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title_en: title,
        title_de: title, // Fallback
        content_en: content,
        content_de: content, // Fallback
        published: post.status === 'publish',
        coverImage,
        updatedAt: new Date(post.modified),
      },
      create: {
        slug: post.slug,
        title_en: title,
        title_de: title,
        content_en: content,
        content_de: content,
        published: post.status === 'publish',
        coverImage,
        createdAt: new Date(post.date),
        updatedAt: new Date(post.modified),
      },
    });
  }
  console.log(`Migrated ${posts.length} posts.`);
}

async function migrateMedia() {
  console.log('Migrating Media to Gallery...');
  const mediaItems = await fetchJson(`${WP_API_URL}/media?per_page=50`); // Fetch recent 50

  for (const item of mediaItems) {
    if (!item.source_url) continue;

    // Check if it already exists to avoid duplicates if running multiple times
    // Since GalleryImage doesn't have a unique slug or externalId, we might create duplicates if we are not careful.
    // But for this task, I'll just create them.
    // Ideally we should have `externalId` in schema.
    // I will check by URL if possible, but URL is not unique in schema.
    // I'll check if a gallery image with this url exists.

    const existing = await prisma.galleryImage.findFirst({
      where: { url: item.source_url },
    });

    if (!existing) {
      await prisma.galleryImage.create({
        data: {
          url: item.source_url,
          caption: item.caption?.rendered ? he.decode(item.caption.rendered.replace(/<[^>]+>/g, '')) : null,
          createdAt: new Date(item.date),
        },
      });
    }
  }
  console.log(`Migrated media.`);
}

async function main() {
  try {
    await migratePosts();
    await migrateMedia();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
