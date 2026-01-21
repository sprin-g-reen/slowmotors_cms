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

async function migratePages() {
  console.log('Migrating Pages to Posts...');
  const pages = await fetchJson(`${WP_API_URL}/pages?per_page=100`);

  for (const page of pages) {
    console.log(`Processing page: ${page.slug}`);

    // We treat pages as Posts for now, as we don't have a Page model
    // and we want to preserve content.

    let coverImage = null;
    if (page.featured_media) {
      coverImage = await getMediaUrl(page.featured_media);
    }

    const title = he.decode(page.title.rendered);
    const content = page.content.rendered;

    await prisma.post.upsert({
      where: { slug: page.slug },
      update: {
        title_en: title,
        title_de: title, // Fallback
        content_en: content,
        content_de: content, // Fallback
        published: page.status === 'publish',
        coverImage,
        updatedAt: new Date(page.modified),
      },
      create: {
        slug: page.slug,
        title_en: title,
        title_de: title,
        content_en: content,
        content_de: content,
        published: page.status === 'publish',
        coverImage,
        createdAt: new Date(page.date),
        updatedAt: new Date(page.modified),
      },
    });
  }
  console.log(`Migrated ${pages.length} pages.`);
}

async function migrateMedia() {
  console.log('Migrating Media to Gallery...');
  const mediaItems = await fetchJson(`${WP_API_URL}/media?per_page=50`); // Fetch recent 50

  for (const item of mediaItems) {
    if (!item.source_url) continue;

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
    await migratePages();
    await migrateMedia();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
