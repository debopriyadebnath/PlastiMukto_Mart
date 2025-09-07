# Bounty System Documentation

## Overview
The bounty system allows users to take on community challenges related to waste reduction and recycling, complete them within a time limit, and earn tokens as rewards.

## Features

### ✅ Take Bounty
- Users can click "Take Bounty" on available bounties
- Creates a `BountyAssignment` with status "IN_PROGRESS"
- Sets start time to now and expires at 48 hours
- Prevents duplicate assignments

### ✅ Active Bounties in Profile
- Shows bounty title, description, and token reward
- Displays time left countdown (expiresAt - now)
- Shows status (In Progress, Completed, Expired)
- Automatically marks expired bounties

### ✅ Completion System
- "Mark as Completed" button for active bounties
- Adds tokens to user balance on completion
- Updates assignment status to "COMPLETED"
- Shows completion timestamp

## Database Schema

### BountyAssignment Model
```prisma
model BountyAssignment {
  id          String   @id @default(cuid())
  status      String   @default("IN_PROGRESS") // IN_PROGRESS, COMPLETED, EXPIRED
  startTime   DateTime @default(now())
  expiresAt   DateTime
  completedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  user        User   @relation(fields: [userId], references: [id])
  userId      String
  bounty      Bounty @relation(fields: [bountyId], references: [id])
  bountyId    String

  @@unique([userId, bountyId]) // Prevent duplicate assignments
}
```

## API Endpoints

### GET /api/bounty
- Fetches all available bounties (status: 'open')
- Returns bounties with user information

### POST /api/bounty/take
- Takes a bounty for the current user
- Creates a new BountyAssignment
- Prevents duplicate assignments

### POST /api/bounty/complete
- Completes a bounty assignment
- Adds tokens to user balance
- Updates assignment status

### GET /api/bounty/assignments
- Fetches user's bounty assignments
- Automatically updates expired assignments
- Returns assignments with bounty details

### POST /api/bounty/seed
- Creates sample bounties for testing
- Requires at least one user in the database

## Pages

### Community Page (/dashboard/community)
- Displays available bounties
- "Take Bounty" button for each bounty
- Shows bounty details and rewards

### Profile Page (/dashboard/profile)
- Shows user's bounty assignments
- Displays active, completed, and expired bounties
- Time countdown for active bounties
- "Mark as Completed" button

### Admin Page (/dashboard/admin)
- Seed sample bounties
- System status information
- Management tools

## Setup Instructions

1. **Database Migration**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Seed Sample Data**
   - Visit `/dashboard/admin`
   - Click "Seed Bounties" button
   - Or call `POST /api/bounty/seed` directly

3. **Test the System**
   - Go to Community page to see bounties
   - Take a bounty to test assignment
   - Check Profile page for active bounties
   - Complete a bounty to test the flow

## Sample Bounties

The system includes 6 sample bounties:
1. **Plastic Bottle Collection Drive** (100 tokens)
2. **Cardboard Box Art Project** (75 tokens)
3. **Glass Jar Herb Garden** (50 tokens)
4. **Metal Can Wind Chimes** (60 tokens)
5. **Electronic Waste Awareness Campaign** (150 tokens)
6. **Composting Workshop** (80 tokens)

## Status Flow

```
OPEN → IN_PROGRESS → COMPLETED
  ↓
EXPIRED (if time runs out)
```

## Time Management

- **Assignment Duration**: 48 hours by default
- **Automatic Expiry**: Bounties automatically expire when time runs out
- **Countdown Display**: Real-time countdown in profile page
- **Status Updates**: Automatic status updates for expired bounties

## Error Handling

- Prevents duplicate assignments
- Validates user authentication
- Checks bounty availability
- Handles expired assignments
- Provides user-friendly error messages

## Future Enhancements

- Custom bounty creation by users
- Photo proof submission for completion
- Community voting on bounty completion
- Leaderboards for top bounty hunters
- Categories and difficulty levels
- Extended time limits for complex bounties
