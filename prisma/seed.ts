import { PrismaClient, Difficulty, GalleryType, SubmissionStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // 1. Tuscany Coastal Run Ride
  const ride = await prisma.ride.upsert({
    where: { slug: 'tuscany-coastal-run' },
    update: {},
    create: {
      title: 'Tuscany Coastal Run',
      slug: 'tuscany-coastal-run',
      price: 2499.00,
      duration: '3 Days',
      difficulty: Difficulty.LEISURE,
      maxParticipants: 12,
      routeMapUrl: 'https://maps.example.com/tuscany-route',
      content: {
        description: "Experience the rolling hills and vineyards of Tuscany on this leisure drive.",
        itinerary: [
          { day: 1, activity: "Arrival in Florence" },
          { day: 2, activity: "Drive through Chianti" },
          { day: 3, activity: "Coastal finish in Livorno" }
        ]
      },
      dates: {
        create: [
          {
            startDate: new Date('2024-06-01'),
            endDate: new Date('2024-06-03'),
            seatsAvailable: 12
          },
          {
            startDate: new Date('2024-08-15'),
            endDate: new Date('2024-08-17'),
            seatsAvailable: 8
          }
        ]
      }
    },
  })
  console.log(`Created ride: ${ride.title}`)

  // 2. Vintage Vibes Gallery
  const gallery = await prisma.gallery.create({
    data: {
      name: 'Vintage Vibes',
      description: 'A collection of classic cars from the 60s and 70s.',
      type: GalleryType.RIDE_GALLERY,
      items: {
        create: [
          {
            url: 'https://images.example.com/vintage-1.jpg',
            caption: '1965 Mustang',
            width: 1920,
            height: 1080,
            blurData: 'data:image/jpeg;base64,...'
          },
          {
            url: 'https://images.example.com/vintage-2.jpg',
            caption: 'Classic Porsche',
            width: 1920,
            height: 1080,
            blurData: 'data:image/jpeg;base64,...'
          }
        ]
      }
    }
  })
  console.log(`Created gallery: ${gallery.name}`)

  // 3. Dynamic Enquiry Form
  const form = await prisma.dynamicForm.create({
    data: {
      name: 'Dynamic Enquiry',
      isActive: true,
      schema: {
        fields: [
          {
            name: "fullName",
            label: "Full Name",
            type: "text",
            required: true,
            validation: { min: 2 }
          },
          {
            name: "email",
            label: "Email Address",
            type: "email",
            required: true
          },
          {
            name: "interest",
            label: "Area of Interest",
            type: "select",
            options: ["Buying", "Selling", "Tours"],
            required: false
          }
        ]
      }
    }
  })
  console.log(`Created form: ${form.name}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
