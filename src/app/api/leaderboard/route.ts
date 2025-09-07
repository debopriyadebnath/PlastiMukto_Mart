import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get all users with their points, waste analyses, and detected items
    // Note: Using type assertions until Prisma client is regenerated
    const users = await (prisma as any).user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
        rank: true,
        createdAt: true,
        wasteAnalyses: {
          select: {
            id: true,
            imageName: true,
            status: true,
            createdAt: true,
            detectedItems: {
              select: {
                name: true,
                category: true,
                material: true,
                confidence: true,
                description: true
              }
            }
          },
          where: {
            status: 'completed'
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        bountyAssignments: {
          select: {
            id: true,
            status: true,
            bounty: {
              select: {
                title: true,
                rewardTokens: true
              }
            }
          },
          where: {
            status: 'COMPLETED'
          }
        }
      },
      orderBy: {
        points: 'desc'
      }
    });

    // Calculate additional stats for each user
    const leaderboardData = users.map((user: any, index: number) => {
      const totalRecycledItems = (user.wasteAnalyses || []).reduce((total: number, analysis: any) => {
        return total + (analysis.detectedItems || []).length;
      }, 0);

      const totalBountiesCompleted = (user.bountyAssignments || []).length;
      const totalBountyRewards = (user.bountyAssignments || []).reduce((total: number, assignment: any) => {
        return total + (assignment.bounty?.rewardTokens || 0);
      }, 0);

      const categories = new Set();
      const materials = new Set();
      
      (user.wasteAnalyses || []).forEach((analysis: any) => {
        (analysis.detectedItems || []).forEach((item: any) => {
          categories.add(item.category);
          if (item.material) {
            materials.add(item.material);
          }
        });
      });

      return {
        ...user,
        position: index + 1,
        totalRecycledItems,
        totalBountiesCompleted,
        totalBountyRewards,
        categoriesCount: categories.size,
        materialsCount: materials.size,
        categories: Array.from(categories),
        materials: Array.from(materials),
        recentActivity: (user.wasteAnalyses || []).slice(0, 3), // Last 3 analyses
        allDetectedItems: (user.wasteAnalyses || []).flatMap((analysis: any) => 
          (analysis.detectedItems || []).map((item: any) => ({
            ...item,
            analysisDate: analysis.createdAt,
            imageName: analysis.imageName
          }))
        )
      };
    });

    return NextResponse.json({ 
      success: true, 
      leaderboard: leaderboardData,
      totalUsers: users.length
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
