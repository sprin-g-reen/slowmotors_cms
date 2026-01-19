import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.galleryImage.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up database');

  // Create User
  await prisma.user.create({
    data: {
      email: 'admin@slowmotors.com',
      password: 'securepassword123', // In a real app, hash this!
      name: 'Admin User',
    },
  });

  // Create Tours
  const tour1 = await prisma.tour.create({
    data: {
      slug: 'himalayan-adventure',
      title_en: 'Himalayan Adventure',
      title_de: 'Himalaya Abenteuer',
      description_en: 'Experience the thrill of the highest motorable roads in the world.',
      description_de: 'Erleben Sie den Nervenkitzel der höchsten befahrbaren Straßen der Welt.',
      startDate: new Date('2024-06-15'),
      endDate: new Date('2024-06-25'),
      difficulty: 'Hard',
      priceEur: 2500,
      priceInr: 200000,
      status: 'Available',
    },
  });

  const tour2 = await prisma.tour.create({
    data: {
      slug: 'rajasthan-royal',
      title_en: 'Royal Rajasthan',
      title_de: 'Königliches Rajasthan',
      description_en: 'Cruising through the desert state of palaces and forts.',
      description_de: 'Fahrt durch den Wüstenstaat der Paläste und Festungen.',
      startDate: new Date('2024-11-01'),
      endDate: new Date('2024-11-10'),
      difficulty: 'Easy',
      priceEur: 1800,
      priceInr: 150000,
      status: 'Last Seats',
    },
  });

  // Create Posts
  await prisma.post.create({
    data: {
      slug: 'preparing-for-ladakh',
      title_en: 'Preparing for Ladakh',
      title_de: 'Vorbereitung auf Ladakh',
      content_en: '<p>Essential gear and tips for high altitude riding.</p>',
      content_de: '<p>Wichtige Ausrüstung und Tipps für Fahrten in großer Höhe.</p>',
      published: true,
    },
  });

  // Create Gallery Images (Placeholder)
  await prisma.galleryImage.create({
    data: {
      url: 'https://placehold.co/600x400?text=Himalayas',
      tourId: tour1.id,
      caption: 'Khardung La Pass',
    },
  });

  await prisma.galleryImage.create({
    data: {
      url: 'https://placehold.co/600x400?text=Rajasthan',
      tourId: tour2.id,
      caption: 'Desert Sunset',
    },
  });

  console.log('Seeded database with sample data');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
