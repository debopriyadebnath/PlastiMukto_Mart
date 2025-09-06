import { NextRequest, NextResponse } from 'next/server'
import { getTokenFromRequest, verifyToken } from '@/lib/auth'
import { uploadWasteImage } from '@/lib/supabase/storage'
import prisma from '@/lib/prisma'
import { wasteAnalysisUploadSchema } from '@/lib/validations/waste-analysis'

export async function POST(request: NextRequest) {
  try {
    console.log('Waste analysis upload request received')
    
    // Verify authentication
    const token = getTokenFromRequest(request)
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required' },
        { status: 401 }
      )
    }

    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('image') as File
    const userId = payload.id

    if (!file) {
      return NextResponse.json(
        { message: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate the upload
    const validation = wasteAnalysisUploadSchema.safeParse({ image: file, userId })
    if (!validation.success) {
      return NextResponse.json(
        { 
          message: 'Invalid file', 
          errors: validation.error.errors 
        },
        { status: 400 }
      )
    }

    console.log('Uploading image to Supabase...')
    
    // Upload to Supabase storage
    const uploadResult = await uploadWasteImage(file, userId)
    
    if (!uploadResult.success) {
      console.error('Upload failed:', uploadResult.error)
      return NextResponse.json(
        { message: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

    console.log('Image uploaded successfully:', uploadResult.url)

    // Create analysis record in database
    const analysis = await prisma.wasteAnalysis.create({
      data: {
        imageUrl: uploadResult.url!,
        imageName: file.name,
        imageSize: file.size,
        mimeType: file.type,
        status: 'processing',
        userId: userId
      }
    })

    console.log('Analysis record created:', analysis.id)

    return NextResponse.json({
      success: true,
      analysisId: analysis.id,
      imageUrl: uploadResult.url,
      message: 'Image uploaded successfully'
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
