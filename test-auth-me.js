// Test script to verify auth/me endpoint
const testAuthMe = async () => {
  try {
    console.log('Testing auth/me endpoint...');
    
    const response = await fetch('http://localhost:3000/api/auth/me', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Auth/me successful!');
    } else {
      console.log('❌ Auth/me failed (expected if not logged in)');
    }
  } catch (error) {
    console.error('❌ Error testing auth/me:', error.message);
  }
};

// Run test
testAuthMe();

