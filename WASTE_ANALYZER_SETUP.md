# Waste Analyzer Setup Guide

This guide will help you set up the waste analyzer feature with Gemini OCR and Supabase storage.

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Google AI Studio Account**: Get API key from [makersuite.google.com](https://makersuite.google.com)
3. **Node.js**: Version 18 or higher

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Database (existing)
DATABASE_URL="postgresql://username:password@localhost:5432/smartmakeathon"
JWT_SECRET="your-super-secret-jwt-key-here"

# Supabase Configuration
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"

# Gemini AI Configuration
GEMINI_API_KEY="your-gemini-api-key"

# Supabase Storage Bucket
SUPABASE_STORAGE_BUCKET="waste-images"
```

## Supabase Setup

### 1. Create a New Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

### 2. Create Storage Bucket
1. In your Supabase dashboard, go to **Storage**
2. Create a new bucket named `waste-images`
3. Set the bucket to **Public** for image access
4. Configure RLS (Row Level Security) policies:

```sql
-- Allow authenticated users to upload
CREATE POLICY "Users can upload their own images" ON storage.objects
FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to view their own images
CREATE POLICY "Users can view their own images" ON storage.objects
FOR SELECT USING (auth.uid()::text = (storage.foldername(name))[1]);

-- Allow authenticated users to delete their own images
CREATE POLICY "Users can delete their own images" ON storage.objects
FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
```

## Gemini AI Setup

### 1. Get API Key
1. Go to [Google AI Studio](https://makersuite.google.com)
2. Create a new API key
3. Copy the key to your `.env.local` file

### 2. Enable Required APIs
Make sure the following APIs are enabled in your Google Cloud Console:
- Generative Language API
- Vertex AI API (if using advanced features)

## Database Migration

Run the following commands to update your database:

```bash
# Install new dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migration
npx prisma migrate dev --name add-waste-analysis

# Seed the database with sample waste products
npm run db:seed
```

## Next.js Configuration

Update your `next.config.ts` to include your Supabase domain:

```typescript
const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.unsplash.com', 
      'randomuser.me',
      'your-project.supabase.co' // Add your Supabase domain here
    ],
  },
};
```

## Testing the Setup

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Navigate to the waste analyzer**:
   - Go to `/dashboard/profile/waste-analyzer`
   - Upload a test image
   - Check if the analysis completes successfully

3. **Verify Supabase storage**:
   - Check your Supabase dashboard > Storage
   - Verify images are being uploaded to the `waste-images` bucket

4. **Check database**:
   - Use Prisma Studio: `npx prisma studio`
   - Verify `WasteAnalysis` and `DetectedWasteItem` records are created

## Features Included

### ✅ Core Features
- **Image Upload**: Drag & drop interface with validation
- **AI Analysis**: Gemini OCR for waste item detection
- **Results Display**: Comprehensive analysis with lifecycle, recycling, and reuse info
- **History Tracking**: View all past analyses
- **Points System**: Earn points for successful analyses
- **Responsive Design**: Works on desktop and mobile

### ✅ Technical Features
- **Supabase Storage**: Secure image storage and management
- **Prisma Integration**: Type-safe database operations
- **Authentication**: JWT-based user authentication
- **Error Handling**: Comprehensive error handling and user feedback
- **TypeScript**: Full type safety throughout the application

## API Endpoints

- `POST /api/waste-analysis/upload` - Upload image to Supabase
- `POST /api/waste-analysis/analyze` - Trigger Gemini analysis
- `GET /api/waste-analysis/results/[id]` - Get analysis results
- `GET /api/waste-analysis/history` - Get user's analysis history

## Troubleshooting

### Common Issues

1. **Supabase Connection Error**:
   - Verify your Supabase URL and keys
   - Check if the storage bucket exists and is public

2. **Gemini API Error**:
   - Verify your API key is correct
   - Check if you have sufficient quota

3. **Image Upload Fails**:
   - Check file size (max 10MB)
   - Verify file type (JPEG, PNG, WebP only)
   - Check Supabase storage policies

4. **Analysis Stuck in Processing**:
   - Check Gemini API quota and limits
   - Verify image URL is accessible
   - Check server logs for errors

### Debug Mode

Enable debug logging by setting:
```env
NODE_ENV=development
```

## Production Deployment

### Environment Variables
Make sure to set all environment variables in your production environment.

### Supabase Production Setup
1. Create a production Supabase project
2. Set up proper RLS policies
3. Configure CORS settings for your domain

### Gemini API Limits
- Monitor your API usage
- Set up billing alerts
- Consider implementing rate limiting

## Support

If you encounter any issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test each component individually (upload, analysis, results)
4. Check Supabase and Gemini API dashboards for quota/error information

## Next Steps

After successful setup, you can:
1. Customize the AI prompts for better analysis
2. Add more waste product categories
3. Implement advanced features like batch analysis
4. Add social sharing features
5. Integrate with local recycling centers API
