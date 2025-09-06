'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DetectedWasteItem } from '@/types/waste-analysis'

interface ReuseIdeasProps {
  reuseIdeas: any
  detectedItems: DetectedWasteItem[]
}

export default function ReuseIdeas({ reuseIdeas, detectedItems }: ReuseIdeasProps) {
  const getReuseIdeas = (item: DetectedWasteItem) => {
    const category = item.category.toLowerCase()
    const name = item.name.toLowerCase()

    // General ideas by category
    const categoryIdeas: Record<string, string[]> = {
      plastic: [
        'Use as plant pots or seed starters',
        'Create storage containers for small items',
        'Make bird feeders or water dispensers',
        'Use for organizing craft supplies',
        'Create DIY watering cans'
      ],
      paper: [
        'Use for wrapping gifts or packages',
        'Create origami decorations',
        'Make bookmarks or notepads',
        'Use for compost or mulch',
        'Create paper mache crafts'
      ],
      cardboard: [
        'Build storage boxes or organizers',
        'Create playhouses or forts for kids',
        'Make drawer dividers',
        'Use as weed barriers in garden',
        'Create shipping boxes for moving'
      ],
      metal: [
        'Use as plant markers in garden',
        'Create wind chimes or decorations',
        'Make tool organizers',
        'Use for DIY projects',
        'Create art sculptures'
      ],
      glass: [
        'Use as vases or candle holders',
        'Create terrariums or plant displays',
        'Make storage jars for pantry items',
        'Use as drinking glasses',
        'Create decorative centerpieces'
      ],
      organic: [
        'Compost for garden fertilizer',
        'Use as natural mulch',
        'Create natural dyes',
        'Feed to compost worms',
        'Use in vermicomposting'
      ],
      electronic: [
        'Salvage working components',
        'Donate to electronics recycling programs',
        'Use for educational purposes',
        'Extract valuable materials',
        'Create art installations'
      ],
      textile: [
        'Make cleaning rags or dust cloths',
        'Create patchwork quilts or blankets',
        'Use for stuffing pillows or toys',
        'Make reusable shopping bags',
        'Create pet bedding'
      ]
    }

    // Specific ideas based on item name
    const specificIdeas: Record<string, string[]> = {
      bottle: [
        'Create self-watering planters',
        'Make bird feeders',
        'Use as storage for rice, beans, or pasta',
        'Create DIY lamps or lanterns',
        'Make musical instruments (shakers)'
      ],
      container: [
        'Use for meal prep storage',
        'Create first aid kit containers',
        'Make travel toiletry holders',
        'Use for organizing small items',
        'Create mini greenhouses for seedlings'
      ],
      box: [
        'Make drawer organizers',
        'Create toy storage',
        'Use for shipping or moving',
        'Make gift boxes',
        'Create pet beds or houses'
      ],
      can: [
        'Use as pencil holders',
        'Create wind chimes',
        'Make plant pots',
        'Use for storing small tools',
        'Create candle holders'
      ]
    }

    // Get ideas based on category
    let ideas = categoryIdeas[category] || [
      'Check local reuse centers',
      'Donate to charity organizations',
      'Use for DIY craft projects',
      'Repurpose for storage needs',
      'Create art or decorations'
    ]

    // Add specific ideas if item name matches
    for (const [keyword, specificList] of Object.entries(specificIdeas)) {
      if (name.includes(keyword)) {
        ideas = [...specificList, ...ideas.slice(0, 3)] // Mix specific and general
        break
      }
    }

    return ideas.slice(0, 5) // Return top 5 ideas
  }

  const getDifficultyLevel = (idea: string) => {
    if (idea.includes('storage') || idea.includes('organiz')) return 'Easy'
    if (idea.includes('DIY') || idea.includes('craft')) return 'Medium'
    if (idea.includes('art') || idea.includes('sculpture')) return 'Hard'
    return 'Easy'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Creative Reuse Ideas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {detectedItems.map((item) => {
            const ideas = getReuseIdeas(item)
            return (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <h4 className="font-medium text-gray-900">{item.name}</h4>
                  <span className="text-sm text-gray-500">({item.category})</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ideas.map((idea, index) => {
                    const difficulty = getDifficultyLevel(idea)
                    return (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm text-gray-700 flex-1">{idea}</p>
                          <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
                            {difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <span>💡</span>
                          <span>Reuse idea</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* General Reuse Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">🌟 General Reuse Tips</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div>
                <h5 className="font-medium mb-2">Before You Buy:</h5>
                <ul className="space-y-1">
                  <li>• Can you repurpose something you already have?</li>
                  <li>• Check local reuse centers first</li>
                  <li>• Consider borrowing or renting</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium mb-2">Creative Thinking:</h5>
                <ul className="space-y-1">
                  <li>• Look at items with fresh eyes</li>
                  <li>• Combine multiple items for new uses</li>
                  <li>• Share ideas with your community</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Community Sharing */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">🤝 Share Your Ideas</h4>
            <p className="text-sm text-green-800 mb-3">
              Have creative reuse ideas? Share them with the community and inspire others to reduce waste!
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm">
              Share Your Reuse Ideas
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
