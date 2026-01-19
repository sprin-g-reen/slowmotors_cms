import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.galleryImage.deleteMany();
  await prisma.tourDate.deleteMany();
  await prisma.tour.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleaned up database');

  // Create User
  await prisma.user.create({
    data: {
      email: 'admin@slowmotors.com',
      password: 'securepassword123',
      name: 'Admin User',
    },
  });

  // Create Tours
  const tour1 = await prisma.tour.create({
    data: {
      slug: 'himalayan-odyssey',
      title_en: 'The Great Himalayan Odyssey',
      title_de: 'Die Große Himalaya-Odyssee',
      description_en: 'Conquer the highest motorable passes in the world. A 10-day expedition through Ladakh, Zanskar, and the Nubra Valley. Rugged terrain, ancient monasteries, and pure adrenaline.',
      description_de: 'Erobern Sie die höchsten befahrbaren Pässe der Welt. Eine 10-tägige Expedition durch Ladakh, Zanskar und das Nubra-Tal. Schroffe Landschaften, alte Klöster und pures Adrenalin.',
      difficulty: 'Expert',
      priceEur: 3200,
      priceInr: 280000,
      dates: {
          create: [
              { startDate: new Date('2024-07-01'), endDate: new Date('2024-07-11'), status: 'LastSeats' },
              { startDate: new Date('2024-08-01'), endDate: new Date('2024-08-11'), status: 'Available' }
          ]
      }
    },
  });

  const tour2 = await prisma.tour.create({
    data: {
      slug: 'rajasthan-royals',
      title_en: 'Rajasthan Royals: Desert Storm',
      title_de: 'Rajasthan Royals: Wüstensturm',
      description_en: 'Ride through the golden sands of Thar. Stay in heritage palaces, witness vibrant culture, and experience the royal hospitality of India on a classic Royal Enfield.',
      description_de: 'Fahren Sie durch den goldenen Sand der Thar. Übernachten Sie in historischen Palästen, erleben Sie die lebendige Kultur und die königliche Gastfreundschaft Indiens auf einer klassischen Royal Enfield.',
      difficulty: 'Medium',
      priceEur: 2400,
      priceInr: 210000,
      dates: {
          create: [
              { startDate: new Date('2024-11-15'), endDate: new Date('2024-11-25'), status: 'Available' }
          ]
      }
    },
  });

   const tour3 = await prisma.tour.create({
    data: {
      slug: 'spiti-valley-adventure',
      title_en: 'Spiti Valley: The Middle Land',
      title_de: 'Spiti Valley: Das Mittelland',
      description_en: 'A challenging ride through the rugged Spiti Valley. Remote villages, treacherous roads, and breathtaking landscapes await.',
      description_de: 'Eine anspruchsvolle Fahrt durch das raue Spiti-Tal. Abgelegene Dörfer, tückische Straßen und atemberaubende Landschaften erwarten Sie.',
      difficulty: 'Hard',
      priceEur: 2100,
      priceInr: 180000,
      dates: {
          create: [
               { startDate: new Date('2024-09-05'), endDate: new Date('2024-09-14'), status: 'SoldOut' }
          ]
      }
    },
  });

  // Create Posts
  await prisma.post.create({
    data: {
      slug: 'gear-guide-2024',
      title_en: 'Essential Gear Guide for High Altitude',
      title_de: 'Wichtiger Ausrüstungsleitfaden für große Höhen',
      content_en: '<p>Riding at 18,000 feet requires more than just skill. Here is what you need to survive and thrive.</p>',
      content_de: '<p>Fahren auf 18.000 Fuß erfordert mehr als nur Können. Hier ist, was Sie brauchen, um zu überleben und zu gedeihen.</p>',
      content: JSON.stringify({
          blocks: [
              { type: 'header', data: { text: 'Helmet Selection', level: 2 } },
              { type: 'paragraph', data: { text: 'Always choose a DOT/ECE certified helmet...' } }
          ]
      }),
      published: true,
      updatedAt: new Date(),
    },
  });

   await prisma.post.create({
    data: {
      slug: 'rajasthan-diaries',
      title_en: 'Diaries from the Dunes',
      title_de: 'Tagebücher aus den Dünen',
      content_en: '<p>Our last trip to Jaisalmer was nothing short of magical. The sunset over the Sam Sand Dunes...</p>',
      content_de: '<p>Unsere letzte Reise nach Jaisalmer war einfach magisch. Der Sonnenuntergang über den Sam Sand Dunes...</p>',
      published: false, // Draft
      updatedAt: new Date(Date.now() - 86400000), // Yesterday
    },
  });

  // Create Gallery Images
  await prisma.galleryImage.create({
    data: {
      url: 'https://images.unsplash.com/photo-1625043484555-47841a750399?q=80&w=2070&auto=format&fit=crop',
      tourId: tour1.id,
      caption: 'Khardung La Pass - 17,582 ft',
    },
  });

  await prisma.galleryImage.create({
    data: {
      url: 'https://images.unsplash.com/photo-1593182440959-9d5165b2d5f2?q=80&w=2088&auto=format&fit=crop',
      tourId: tour1.id,
      caption: 'Nubra Valley Landscapes',
    },
  });

  await prisma.galleryImage.create({
    data: {
      url: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2070&auto=format&fit=crop',
      tourId: tour2.id,
      caption: 'Riding into the Sunset',
    },
  });

  await prisma.galleryImage.create({
    data: {
      url: 'https://images.unsplash.com/photo-1518081661663-435f71442a06?q=80&w=2070&auto=format&fit=crop',
      tourId: tour2.id,
      caption: 'The Royal Enfield Classic',
    },
  });

  console.log('Seeded database with vivid content');
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
