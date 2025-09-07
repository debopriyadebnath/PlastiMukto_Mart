import prisma from './prisma';

export async function seedBounties() {
  try {
    // Create some sample bounties
    const bounties = [
      {
        title: "Plastic Bottle Collection Drive",
        description: "Organize a community drive to collect plastic bottles from your neighborhood",
        idea: "Set up collection points at local parks and schools, coordinate with recycling centers",
        rewardTokens: 100,
        status: "open",
        userId: "sample-user-id", // You'll need to replace this with an actual user ID
        wasteAnalysisId: "sample-analysis-id" // You'll need to replace this with an actual analysis ID
      },
      {
        title: "Cardboard Box Art Project",
        description: "Create art installations using recycled cardboard boxes",
        idea: "Transform cardboard boxes into sculptures, furniture, or decorative items",
        rewardTokens: 75,
        status: "open",
        userId: "sample-user-id",
        wasteAnalysisId: "sample-analysis-id"
      },
      {
        title: "Glass Jar Herb Garden",
        description: "Start a herb garden using recycled glass jars",
        idea: "Use glass jars as planters for herbs, create a vertical garden display",
        rewardTokens: 50,
        status: "open",
        userId: "sample-user-id",
        wasteAnalysisId: "sample-analysis-id"
      },
      {
        title: "Metal Can Wind Chimes",
        description: "Create wind chimes using recycled metal cans",
        idea: "Clean and decorate metal cans, string them together to make musical wind chimes",
        rewardTokens: 60,
        status: "open",
        userId: "sample-user-id",
        wasteAnalysisId: "sample-analysis-id"
      },
      {
        title: "Electronic Waste Awareness Campaign",
        description: "Create educational content about electronic waste recycling",
        idea: "Make videos, posters, or social media content about e-waste recycling",
        rewardTokens: 150,
        status: "open",
        userId: "sample-user-id",
        wasteAnalysisId: "sample-analysis-id"
      },
      {
        title: "Composting Workshop",
        description: "Organize a workshop teaching people how to compost organic waste",
        idea: "Host a hands-on workshop showing composting techniques and benefits",
        rewardTokens: 80,
        status: "open",
        userId: "sample-user-id",
        wasteAnalysisId: "sample-analysis-id"
      }
    ];

    // Create bounties
    for (const bounty of bounties) {
      await prisma.bounty.create({
        data: bounty
      });
    }

    console.log('Bounties seeded successfully!');
  } catch (error) {
    console.error('Error seeding bounties:', error);
  }
}
