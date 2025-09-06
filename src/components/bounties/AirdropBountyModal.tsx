'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

type DetectedItem = {
  id: string
  name: string
  category: string
  material?: string | null
}
type WasteAnalysisLite = {
  id: string
  imageUrl: string
  imageName: string
  reuseIdeas?: unknown
  detectedItems: DetectedItem[]
}

interface Props {
  open: boolean
  onClose: () => void
  onCreated: (bounty: any) => void
}

export default function AirdropBountyModal({ open, onClose, onCreated }: Props) {
  const [loading, setLoading] = useState(false)
  const [analyses, setAnalyses] = useState<WasteAnalysisLite[]>([])
  const [selectedId, setSelectedId] = useState<string>('')
  const [idea, setIdea] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [rewardTokens, setRewardTokens] = useState<number | ''>('')

  useEffect(() => {
    if (!open) return
    ;(async () => {
      try {
        const res = await fetch('/api/waste-analysis/history', { credentials: 'include' })
        const data = await res.json()
        if (data.success) setAnalyses(data.analyses)
      } catch (e) {
        console.error('Load analyses error', e)
      }
    })()
  }, [open])

  const selected = useMemo(
    () => analyses.find(a => a.id === selectedId),
    [analyses, selectedId]
  )

  const reuseIdeaOptions: string[] = useMemo(() => {
    // Prefer analysis.reuseIdeas if it’s an array; else derive simple ideas from detected items
    const raw = selected?.reuseIdeas
    if (Array.isArray(raw)) return raw.filter((x): x is string => typeof x === 'string')
    const fromItems = (selected?.detectedItems || []).map(i => `Build with ${i.name} (${i.category})`)
    return fromItems
  }, [selected])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedId || !idea || !title) return
    setLoading(true)
    try {
      const res = await fetch('/api/bounties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          wasteAnalysisId: selectedId,
          idea,
          title,
          description,
          rewardTokens: rewardTokens === '' ? null : rewardTokens
        })
      })
      const data = await res.json()
      if (data.success) {
        onCreated(data.bounty)
        onClose()
      }
    } catch (e) {
      console.error('Create bounty error', e)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl border border-green-200 w-full max-w-2xl p-6 relative">
        <button className="absolute top-4 right-4 text-pink-500 hover:text-pink-700" onClick={onClose} aria-label="Close">✕</button>
        <h2 className="text-2xl font-extrabold text-green-700 mb-4">Airdrop Bounty</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Choose one of your analyzed images</label>
            <select
              className="w-full border rounded-lg p-2"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              required
            >
              <option value="">Select image</option>
              {analyses.map(a => (
                <option key={a.id} value={a.id}>{a.imageName}</option>
              ))}
            </select>
            {selected && (
              <div className="mt-3 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.imageUrl} alt={selected.imageName} className="w-24 h-24 object-cover rounded" />
                <div className="text-sm text-gray-600">
                  <div>{selected.imageName}</div>
                  <div>{selected.detectedItems.length} detected items</div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reuse idea</label>
            {reuseIdeaOptions.length > 0 ? (
              <select className="w-full border rounded-lg p-2" value={idea} onChange={e => setIdea(e.target.value)} required>
                <option value="">Select a reuse idea</option>
                {reuseIdeaOptions.map((opt, i) => (
                  <option key={i} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                className="w-full border rounded-lg p-2"
                placeholder="Describe the reuse idea"
                value={idea}
                onChange={e => setIdea(e.target.value)}
                required
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input className="w-full border rounded-lg p-2" placeholder="e.g., Build a planter from bottles" value={title} onChange={e => setTitle(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward (tokens)</label>
              <input
                type="number"
                min={0}
                className="w-full border rounded-lg p-2"
                placeholder="e.g., 50"
                value={rewardTokens}
                onChange={e => setRewardTokens(e.target.value === '' ? '' : Number(e.target.value))}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full border rounded-lg p-2 min-h-[90px]" placeholder="What should be built and any constraints" value={description} onChange={e => setDescription(e.target.value)} />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" className="bg-gray-200 text-gray-800 hover:bg-gray-300" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white" disabled={loading}>
              {loading ? 'Creating...' : 'Create Bounty'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}