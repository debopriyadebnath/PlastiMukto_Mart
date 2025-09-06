'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DetectedWasteItem } from '@/types/waste-analysis'

interface RecyclingOptionsProps {
  recyclingOptions: any
  detectedItems: DetectedWasteItem[]
}

export default function RecyclingOptions({ recyclingOptions, detectedItems }: RecyclingOptionsProps) {
  const getRecyclingInfo = (item: DetectedWasteItem) => {
    const category = item.category.toLowerCase()
    const material = item.material?.toLowerCase()

    switch (category) {
      case 'plastic':
        return {
          recyclable: true,
          code: material === 'pet' ? 'PET #1' : material === 'hdpe' ? 'HDPE #2' : 'Check code',
          preparation: 'Rinse clean, remove labels if possible',
          where: 'Curbside recycling or local recycling center',
          notes: 'Most plastic bottles and containers are recyclable'
        }
      case 'paper':
      case 'cardboard':
        return {
          recyclable: true,
          code: 'Paper/Cardboard',
          preparation: 'Keep dry, remove any plastic or metal components',
          where: 'Curbside recycling or paper recycling bins',
          notes: 'One of the most easily recyclable materials'
        }
      case 'metal':
        return {
          recyclable: true,
          code: material === 'aluminum' ? 'Aluminum' : 'Metal',
          preparation: 'Rinse clean, remove any food residue',
          where: 'Curbside recycling or scrap metal dealers',
          notes: 'Metals can be recycled indefinitely without quality loss'
        }
      case 'glass':
        return {
          recyclable: true,
          code: 'Glass',
          preparation: 'Rinse clean, remove caps and labels',
          where: 'Curbside recycling or glass recycling bins',
          notes: 'Glass can be recycled endlessly'
        }
      case 'organic':
        return {
          recyclable: false,
          code: 'Compostable',
          preparation: 'Remove any non-organic materials',
          where: 'Compost bin or municipal composting program',
          notes: 'Great for composting and soil enrichment'
        }
      case 'electronic':
        return {
          recyclable: true,
          code: 'E-waste',
          preparation: 'Remove batteries, wipe personal data',
          where: 'E-waste collection centers or electronics retailers',
          notes: 'Special handling required due to hazardous materials'
        }
      default:
        return {
          recyclable: false,
          code: 'Check locally',
          preparation: 'Check with local waste management',
          where: 'Local waste management facility',
          notes: 'Recycling options vary by location and material'
        }
    }
  }

  const recyclableItems = detectedItems.filter(item => getRecyclingInfo(item).recyclable)
  const nonRecyclableItems = detectedItems.filter(item => !getRecyclingInfo(item).recyclable)

  return (
    <div className="space-y-6">
      {/* Recycling Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">♻️</span>
            Recycling Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">✅</span>
                <h4 className="font-medium text-green-900">Recyclable Items</h4>
              </div>
              <div className="text-2xl font-bold text-green-600">{recyclableItems.length}</div>
              <p className="text-sm text-green-700">items can be recycled</p>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">⚠️</span>
                <h4 className="font-medium text-orange-900">Special Handling</h4>
              </div>
              <div className="text-2xl font-bold text-orange-600">{nonRecyclableItems.length}</div>
              <p className="text-sm text-orange-700">items need special disposal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recyclable Items */}
      {recyclableItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">♻️</span>
              Recyclable Items ({recyclableItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recyclableItems.map((item) => {
                const info = getRecyclingInfo(item)
                return (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {info.code}
                        </span>
                      </div>
                      <span className="text-green-600 text-sm font-medium">✅ Recyclable</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Preparation:</h5>
                        <p className="text-gray-600">{info.preparation}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Where to Recycle:</h5>
                        <p className="text-gray-600">{info.where}</p>
                      </div>
                    </div>
                    
                    {info.notes && (
                      <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-800">
                        💡 {info.notes}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Non-Recyclable Items */}
      {nonRecyclableItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              Special Disposal Required ({nonRecyclableItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nonRecyclableItems.map((item) => {
                const info = getRecyclingInfo(item)
                return (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
                          {info.code}
                        </span>
                      </div>
                      <span className="text-orange-600 text-sm font-medium">⚠️ Special Handling</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Preparation:</h5>
                        <p className="text-gray-600">{info.preparation}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-700 mb-1">Disposal Method:</h5>
                        <p className="text-gray-600">{info.where}</p>
                      </div>
                    </div>
                    
                    {info.notes && (
                      <div className="mt-3 p-2 bg-orange-50 rounded text-sm text-orange-800">
                        💡 {info.notes}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recycling Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Recycling Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">✅ Do:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Rinse containers before recycling</li>
                <li>• Remove caps and labels when possible</li>
                <li>• Check local recycling guidelines</li>
                <li>• Keep recyclables dry and clean</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">❌ Don't:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Put dirty or contaminated items in recycling</li>
                <li>• Include plastic bags in curbside recycling</li>
                <li>• Mix different types of materials</li>
                <li>• Assume all plastics are recyclable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
