import sharp from 'sharp'

export interface ImageProcessingOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'png' | 'webp'
}

export interface ProcessedImage {
  buffer: Buffer
  width: number
  height: number
  format: string
  size: number
}

export async function processImage(
  imageBuffer: Buffer,
  options: ImageProcessingOptions = {}
): Promise<ProcessedImage> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 85,
    format = 'jpeg'
  } = options

  try {
    let pipeline = sharp(imageBuffer)
    
    // Get image metadata
    const metadata = await pipeline.metadata()
    
    // Resize if necessary
    if (metadata.width && metadata.height) {
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        pipeline = pipeline.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        })
      }
    }
    
    // Convert to specified format
    switch (format) {
      case 'jpeg':
        pipeline = pipeline.jpeg({ quality })
        break
      case 'png':
        pipeline = pipeline.png({ quality })
        break
      case 'webp':
        pipeline = pipeline.webp({ quality })
        break
    }
    
    const processedBuffer = await pipeline.toBuffer()
    const processedMetadata = await sharp(processedBuffer).metadata()
    
    return {
      buffer: processedBuffer,
      width: processedMetadata.width || 0,
      height: processedMetadata.height || 0,
      format: processedMetadata.format || format,
      size: processedBuffer.length
    }
  } catch (error) {
    console.error('Image processing error:', error)
    throw new Error('Failed to process image')
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file size (10MB limit)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 10MB' }
  }
  
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' }
  }
  
  return { valid: true }
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      reject(new Error('Failed to load image'))
    }
    img.src = URL.createObjectURL(file)
  })
}

export function generateImageThumbnail(
  imageBuffer: Buffer,
  size: number = 200
): Promise<Buffer> {
  return sharp(imageBuffer)
    .resize(size, size, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toBuffer()
}
