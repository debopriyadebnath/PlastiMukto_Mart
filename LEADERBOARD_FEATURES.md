# 🏆 Eco Leaderboard Features

## Overview
A comprehensive leaderboard system that showcases users' environmental impact through their recycling activities, bounty completions, and points earned.

## ✨ Key Features

### **📊 Comprehensive Statistics**
- **Total Points** - User's accumulated points from all activities
- **Items Recycled** - Count of waste items analyzed and recycled
- **Bounties Completed** - Number of community bounties finished
- **Categories Covered** - Different waste categories (Plastic, Paper, Metal, etc.)
- **Materials Identified** - Specific materials detected (PET, HDPE, Aluminum, etc.)

### **🎯 User Rankings**
- **Position-based Icons** - 🥇 Gold, 🥈 Silver, 🥉 Bronze for top 3
- **Your Profile Highlight** - Current user's entry is highlighted
- **Real-time Updates** - Rankings update based on latest activities

### **♻️ Recycling Details**
- **Recent Items** - Shows last 6 recycled items with details
- **Item Information** - Name, category, material, confidence score, description
- **Analysis Dates** - When each item was analyzed
- **Confidence Scores** - AI detection accuracy percentages

### **🏷️ Category & Material Tags**
- **Visual Badges** - Color-coded tags for categories and materials
- **Diversity Tracking** - Shows how many different types user has recycled
- **Material Recognition** - Specific material types identified

## 🔧 Technical Implementation

### **API Endpoint**
- **Route**: `/api/leaderboard`
- **Method**: GET
- **Authentication**: Not required (public leaderboard)
- **Data Source**: Prisma database with user relations

### **Data Structure**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  position: number;
  totalRecycledItems: number;
  totalBountiesCompleted: number;
  categoriesCount: number;
  materialsCount: number;
  categories: string[];
  materials: string[];
  allDetectedItems: DetectedItem[];
}
```

### **Database Relations**
- **User** → **WasteAnalysis** → **DetectedWasteItem**
- **User** → **BountyAssignment** → **Bounty**
- Aggregated statistics calculated in real-time

## 🎨 UI/UX Features

### **Visual Design**
- **Gradient Background** - Pink to green eco-friendly theme
- **Card-based Layout** - Clean, modern card design
- **Hover Effects** - Smooth animations and interactions
- **Responsive Grid** - Works on all screen sizes

### **Interactive Elements**
- **Hover Animations** - Cards lift and glow on hover
- **Badge System** - Color-coded category and material tags
- **Loading States** - Smooth loading animations
- **Error Handling** - Graceful fallback to sample data

### **Statistics Dashboard**
- **Overview Cards** - Total champions, items recycled, bounties completed
- **Individual Stats** - Per-user detailed statistics
- **Progress Tracking** - Visual representation of achievements

## 📱 Sample Data
The leaderboard includes sample data for demonstration:
- **Eco Warrior** - 2,450 points, 28 items, 12 bounties
- **Green Thumb** - 1,890 points, 22 items, 8 bounties  
- **Recycle Master** - 1,650 points, 18 items, 6 bounties

## 🚀 Usage

### **Accessing the Leaderboard**
1. Navigate to `/dashboard/leaderboard`
2. View comprehensive rankings and statistics
3. See your own position highlighted
4. Explore detailed recycling history

### **Data Sources**
- **Real Data**: Fetches from database when available
- **Sample Data**: Falls back to demo data if API fails
- **Live Updates**: Refreshes automatically

## 🔮 Future Enhancements
- **Filtering Options** - Filter by category, time period, etc.
- **Achievement Badges** - Special recognition for milestones
- **Social Features** - Follow other users, share achievements
- **Charts & Graphs** - Visual progress tracking
- **Export Options** - Download personal recycling reports

## 🛠️ Setup Requirements
1. **Prisma Client**: Run `npx prisma generate` to include new models
2. **Database**: Ensure `WasteAnalysis` and `DetectedWasteItem` tables exist
3. **API Route**: `/api/leaderboard` endpoint configured
4. **Authentication**: User context available for highlighting current user

The leaderboard provides a gamified, engaging way to track environmental impact and encourage sustainable behavior through friendly competition! 🌍
