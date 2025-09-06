import { supabase } from './client'

const BUCKET_NAME = 'waste-images'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export async function uploadWasteImage(
  file: File, 
  userId: string
): Promise<UploadResult> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Date.now()}.${fileExt}`
    
    // Upload to Supabase storage
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      return { success: false, error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName)

    return { 
      success: true, 
      url: urlData.publicUrl 
    }
  } catch (error) {
    console.error('Upload error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Upload failed' 
    }
  }
}

export async function deleteWasteImage(imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from URL
    const urlParts = imageUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]
    const userId = urlParts[urlParts.length - 2]
    const filePath = `${userId}/${fileName}`

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Delete error:', error)
    return false
  }
}

export async function getImageUrl(filePath: string): Promise<string> {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath)
  
  return data.publicUrl
}
