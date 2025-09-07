#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Bounty System...\n');

try {
  // Check if Prisma is installed
  console.log('📦 Checking Prisma installation...');
  try {
    execSync('npx prisma --version', { stdio: 'pipe' });
    console.log('✅ Prisma is installed');
  } catch (error) {
    console.log('❌ Prisma not found. Installing...');
    execSync('npm install prisma @prisma/client', { stdio: 'inherit' });
  }

  // Generate Prisma client
  console.log('\n🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');

  // Check if database needs migration
  console.log('\n🗄️ Checking database status...');
  try {
    execSync('npx prisma db push', { stdio: 'pipe' });
    console.log('✅ Database schema is up to date');
  } catch (error) {
    console.log('⚠️ Database push failed. You may need to run: npx prisma db push');
  }

  console.log('\n🎉 Bounty system setup complete!');
  console.log('\nNext steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Visit /dashboard/community to see available bounties');
  console.log('3. Visit /dashboard/profile to manage your bounty assignments');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\nManual setup steps:');
  console.log('1. Run: npx prisma generate');
  console.log('2. Run: npx prisma db push');
  console.log('3. Start your development server: npm run dev');
  process.exit(1);
}