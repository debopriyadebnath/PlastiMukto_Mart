import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create sample waste products
  const wasteProducts = [
    {
      name: 'Plastic Water Bottle',
      category: 'Plastic',
      material: 'PET',
      description: 'Single-use plastic water bottle',
      lifecycleStages: [
        { stage: 'Production', description: 'Oil extraction and PET manufacturing' },
        { stage: 'Distribution', description: 'Transportation to retail stores' },
        { stage: 'Usage', description: 'Single-use consumption' },
        { stage: 'Disposal', description: 'Landfill or recycling' },
        { stage: 'Decomposition', description: '450+ years in landfill' }
      ],
      decompositionTime: '450+ years',
      recyclable: true,
      recyclingCode: 'PET #1',
      recyclingCenters: [
        { name: 'Local Recycling Center', type: 'Municipal' },
        { name: 'Curbside Pickup', type: 'Residential' }
      ],
      reuseIdeas: [
        'Plant watering can',
        'Storage container',
        'Bird feeder',
        'DIY lamp',
        'Seed starter'
      ],
      upcyclingPotential: 'High - many creative uses possible'
    },
    {
      name: 'Cardboard Box',
      category: 'Paper/Cardboard',
      material: 'Corrugated Cardboard',
      description: 'Shipping or storage cardboard box',
      lifecycleStages: [
        { stage: 'Production', description: 'Tree harvesting and paper manufacturing' },
        { stage: 'Distribution', description: 'Transportation and packaging' },
        { stage: 'Usage', description: 'Shipping and storage' },
        { stage: 'Disposal', description: 'Recycling or landfill' },
        { stage: 'Decomposition', description: '2-6 months if composted' }
      ],
      decompositionTime: '2-6 months',
      recyclable: true,
      recyclingCode: 'Cardboard',
      recyclingCenters: [
        { name: 'Curbside Pickup', type: 'Residential' },
        { name: 'Paper Recycling Bin', type: 'Public' }
      ],
      reuseIdeas: [
        'Storage organizer',
        'Kids playhouse',
        'Drawer dividers',
        'Garden mulch',
        'Shipping box'
      ],
      upcyclingPotential: 'Very High - excellent for crafts and organization'
    },
    {
      name: 'Aluminum Can',
      category: 'Metal',
      material: 'Aluminum',
      description: 'Beverage aluminum can',
      lifecycleStages: [
        { stage: 'Production', description: 'Bauxite mining and aluminum smelting' },
        { stage: 'Distribution', description: 'Transportation to beverage companies' },
        { stage: 'Usage', description: 'Single-use beverage container' },
        { stage: 'Disposal', description: 'Recycling or landfill' },
        { stage: 'Decomposition', description: '80-200 years in landfill' }
      ],
      decompositionTime: '80-200 years',
      recyclable: true,
      recyclingCode: 'Aluminum',
      recyclingCenters: [
        { name: 'Curbside Pickup', type: 'Residential' },
        { name: 'Scrap Metal Dealer', type: 'Commercial' }
      ],
      reuseIdeas: [
        'Plant pot',
        'Pencil holder',
        'Wind chime',
        'Candle holder',
        'Tool organizer'
      ],
      upcyclingPotential: 'High - durable and versatile'
    },
    {
      name: 'Glass Bottle',
      category: 'Glass',
      material: 'Soda-lime Glass',
      description: 'Glass beverage or food container',
      lifecycleStages: [
        { stage: 'Production', description: 'Sand, soda ash, and limestone processing' },
        { stage: 'Distribution', description: 'Transportation to food/beverage companies' },
        { stage: 'Usage', description: 'Food/beverage storage' },
        { stage: 'Disposal', description: 'Recycling or landfill' },
        { stage: 'Decomposition', description: '1 million+ years' }
      ],
      decompositionTime: '1 million+ years',
      recyclable: true,
      recyclingCode: 'Glass',
      recyclingCenters: [
        { name: 'Curbside Pickup', type: 'Residential' },
        { name: 'Glass Recycling Bin', type: 'Public' }
      ],
      reuseIdeas: [
        'Vase',
        'Storage jar',
        'Drinking glass',
        'Candle holder',
        'Terrarium'
      ],
      upcyclingPotential: 'Very High - can be reused indefinitely'
    },
    {
      name: 'Food Scraps',
      category: 'Organic',
      material: 'Organic Matter',
      description: 'Kitchen food waste and scraps',
      lifecycleStages: [
        { stage: 'Production', description: 'Agricultural farming and food processing' },
        { stage: 'Distribution', description: 'Transportation to grocery stores' },
        { stage: 'Usage', description: 'Food preparation and consumption' },
        { stage: 'Disposal', description: 'Composting or landfill' },
        { stage: 'Decomposition', description: '2-6 weeks in compost' }
      ],
      decompositionTime: '2-6 weeks',
      recyclable: false,
      recyclingCode: 'Compostable',
      recyclingCenters: [
        { name: 'Home Compost Bin', type: 'Residential' },
        { name: 'Municipal Composting', type: 'Public' }
      ],
      reuseIdeas: [
        'Compost for garden',
        'Natural fertilizer',
        'Worm food',
        'Natural dyes',
        'Biogas production'
      ],
      upcyclingPotential: 'High - excellent for soil enrichment'
    }
  ]

  for (const product of wasteProducts) {
    await prisma.wasteProduct.upsert({
      where: { name: product.name },
      update: product,
      create: product
    })
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📦 Created ${wasteProducts.length} waste products`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
