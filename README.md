# PlastiMukto Mart

PlastiMukto Mart is an AI-powered platform designed to promote plastic waste reduction, recycling, and community engagement. Built with Next.js, Prisma, and Supabase, it offers a marketplace, bounty system, waste analysis tools, and leaderboards to incentivize eco-friendly actions.

---

## 🚀 Demo Instructions

1. *Live Demo:*
	- [Demo Link](#) (Add your deployed URL here)
	- Demo video: [YouTube](#) (Add your demo video link)

2. *Quick Start:*
	- Clone, install, and run as described below.
	- Use provided test credentials or register a new account.

3. *API Keys & Environment:*
	- Required: Supabase, Gemini API keys.
	- Example .env:
	  env
	  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
	  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
	  GEMINI_API_KEY=your_gemini_api_key
	  

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
*AI Waste Analyzer:* Upload images to detect and analyze plastic waste using Gemini AI.
*Bounty System:* Earn rewards for eco-friendly actions and challenges, tracked on the leaderboard.
*Marketplace:* Buy/sell recycled products and eco-friendly goods.
*Leaderboard:* Track top contributors and community impact.
*Community Dashboard:* Connect, share ideas, and collaborate.
*Authentication:* Secure login/register with Supabase.
*Vendor & Rewards:* Vendors can list products, users redeem rewards.
*Modern UI:* Responsive, accessible, and mobile-friendly.

## Tech Stack
- *Frontend:* Next.js, React, Tailwind CSS
- *Backend:* Prisma, Supabase
- *AI Integration:* Gemini API for waste analysis
- *Database:* PostgreSQL (via Supabase)

## Setup Instructions
1. *Clone the repository:*
	powershell
	git clone https://github.com/debopriyadebnath/PlastiMukto_Mart.git
	cd PlastiMukto_Mart
	
2. *Install dependencies:*
	powershell
	npm install
	
3. *Configure environment variables:*
	- Copy .env.example to .env and fill in required values (Supabase, Gemini API, etc).
4. *Set up the database:*
	powershell
	npx prisma migrate dev
	npx prisma generate
	npm run seed # if seed script is available
	
5. *Run the development server:*
	powershell
	npm run dev
	
6. *Access the app:*
	- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
*Waste Analysis:* Go to the dashboard, upload an image, and view AI-powered analysis results.
*Bounties:* Participate in challenges to earn rewards and climb the leaderboard.
*Marketplace:* Browse, buy, or list eco-friendly products.
*Leaderboard:* Check your rank and community stats.
*Profile & Rewards:* View your profile, earned rewards, and redeem them.

## Project Structure

src/
	app/            # Main app pages and API routes
	component/      # Landing page components
	components/     # Reusable UI and feature components
	contexts/       # React context providers
	lib/            # Utility libraries and API clients
	types/          # TypeScript types
prisma/           # Prisma schema and migrations
public/           # Static assets
scripts/          # Setup and seed scripts


## Team & Credits
- *Team Name:* PlastiMukto
- *Members:* Debopriya Debnath (add more as needed)
- *Contact:* [your-email@example.com]

## Judging Criteria Highlights
- *Innovation:* AI-powered waste analysis and gamified bounties.
- *Impact:* Incentivizes real-world eco-friendly actions.
- *Technical Excellence:* Modern stack, scalable architecture.
- *User Experience:* Clean, responsive, and accessible UI.

## Troubleshooting
- If you encounter issues, check your .env setup and API keys.
- Ensure your database is migrated and seeded.
- For build errors, run npm install and npx prisma generate.


## Challenges Faced During Development

*1. AI Integration & Accuracy:*
Integrating the Gemini AI for waste analysis was complex. We had to optimize image upload handling, manage API rate limits, and tune the prompts to improve detection accuracy. Ensuring the AI could reliably identify different types of plastic waste required extensive testing and dataset refinement.

*2. Real-Time Bounty & Leaderboard System:*
Building a dynamic bounty system that tracks user actions and updates leaderboards in real time involved designing efficient database queries and handling concurrency. We faced challenges in ensuring data consistency, especially when multiple users completed bounties simultaneously.

*3. Authentication & Security:*
Implementing secure authentication with Supabase while maintaining a seamless user experience was tricky. We had to address issues with session management, password resets, and protecting sensitive user data.

*4. Marketplace & Vendor Management:*
Creating a flexible marketplace for eco-friendly products required robust CRUD operations, image handling, and vendor authentication. We encountered edge cases with product listings, file uploads, and reward redemption flows.

*5. Environment & API Key Management:*
Managing environment variables and API keys securely for both local development and deployment was a challenge. We had to ensure keys were not exposed and that the app could run smoothly across different environments.

*6. Database Migrations & Seeding:*
Keeping the database schema and seed data in sync between development and production required careful migration planning. We faced issues with data integrity and rollback strategies during rapid iteration.

*7. Responsive & Accessible UI:*
Designing a modern, responsive, and accessible UI for diverse features (dashboard, marketplace, community) was time-consuming. We had to test across devices and browsers, and implement accessibility best practices for all users.

*8. Team Collaboration & Version Control:*
Coordinating work across team members, managing merge conflicts, and maintaining code quality standards was essential. We set up clear branching strategies and code review processes to streamline collaboration.

*9. Performance Optimization:*
As the app grew, optimizing load times, image processing, and database queries became critical. We used caching, lazy loading, and query optimization to improve user experience.

*10. Documentation & Demo Preparation:*
Preparing clear documentation and a smooth demo for hackathon judges required extra effort. We ensured setup instructions, feature guides, and troubleshooting steps were comprehensive and easy to follow.

---

## FAQ
*Q:* How do I reset my password?
*A:* Use the Supabase password reset flow on the login page.

*Q:* How do I add new bounties or products?
*A:* Use the dashboard's bounty or marketplace management features.

## Contributing
We welcome contributions! Please:
1. Fork the repo and create your branch.
2. Follow the code style and naming conventions.
3. Submit a pull request with a clear description.
4. Ensure your changes pass all tests and lint checks.
5. For hackathon: add your name to the team section if you contribute.

## License
This project is licensed under the MIT License.

---