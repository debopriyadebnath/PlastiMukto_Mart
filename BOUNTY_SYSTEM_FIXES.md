# Bounty System Fixes

## Issues Resolved

### 1. **NextAuth Dependency Removed**
- **Problem**: The bounty API routes were using NextAuth (`getServerSession`, `authOptions`) but the project uses custom JWT authentication
- **Solution**: Updated all bounty API routes to use the custom JWT authentication system:
  - `src/app/api/bounty/assignments/route.ts`
  - `src/app/api/bounty/take/route.ts` 
  - `src/app/api/bounty/complete/route.ts`

### 2. **Authentication Integration**
- **Replaced**: `getServerSession(authOptions)` with `getTokenFromRequest(request)` and `verifyToken(token)`
- **Benefits**: 
  - Consistent with existing auth system
  - No external dependencies
  - Uses JWT tokens from cookies

### 3. **Prisma Client Type Issues**
- **Problem**: TypeScript errors due to missing `BountyAssignment` model in generated Prisma client
- **Solution**: Added type assertions `(prisma as any).bountyAssignment` as temporary fix
- **Note**: Run `npx prisma generate` to properly generate types

## Files Modified

### API Routes
- `src/app/api/bounty/assignments/route.ts` - Fixed auth and Prisma calls
- `src/app/api/bounty/take/route.ts` - Fixed auth and Prisma calls  
- `src/app/api/bounty/complete/route.ts` - Fixed auth and Prisma calls

### Profile Page
- `src/app/dashboard/profile/page.tsx` - Added bounty assignments section to right sidebar

## Setup Instructions

### 1. **Generate Prisma Client**
```bash
npx prisma generate
```

### 2. **Update Database Schema** (if needed)
```bash
npx prisma db push
```

### 3. **Run Setup Script** (optional)
```bash
node scripts/setup-bounty-system.js
```

## How It Works

### Authentication Flow
1. User logs in via `/api/auth/login`
2. JWT token stored in HTTP-only cookie
3. Bounty API routes verify token using `getTokenFromRequest()` and `verifyToken()`
4. User ID extracted from verified token payload

### Bounty System Flow
1. **Take Bounty**: User clicks "Take Bounty" → Creates `BountyAssignment` with 48h expiry
2. **View Assignments**: Profile page shows active/completed/expired bounties
3. **Complete Bounty**: User clicks "Complete" → Updates status and adds tokens to user

### Database Schema
```prisma
model BountyAssignment {
  id          String   @id @default(cuid())
  status      String   @default("IN_PROGRESS") // IN_PROGRESS, COMPLETED, EXPIRED
  startTime   DateTime @default(now())
  expiresAt   DateTime
  completedAt DateTime?
  userId      String
  bountyId    String
  user        User     @relation(fields: [userId], references: [id])
  bounty      Bounty   @relation(fields: [bountyId], references: [id])
  @@unique([userId, bountyId])
}
```

## Testing

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Bounty Flow**
   - Visit `/dashboard/community` to see available bounties
   - Click "Take Bounty" on any bounty
   - Visit `/dashboard/profile` to see your assignments
   - Click "Complete" to finish a bounty

3. **Check API Endpoints**
   - `GET /api/bounty/assignments` - Get user's bounty assignments
   - `POST /api/bounty/take` - Take a bounty
   - `POST /api/bounty/complete` - Complete a bounty

## Notes

- All API routes now use the existing JWT authentication system
- No NextAuth dependencies required
- Bounty assignments are displayed in the profile page right sidebar
- Sample data is used if database is not set up
- Type assertions are used temporarily until Prisma client is regenerated
