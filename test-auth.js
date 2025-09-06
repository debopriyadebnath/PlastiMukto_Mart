// Test script to verify authentication API
const testRegistration = async () => {
  try {
    console.log('Testing registration API...');
    
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const data = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Registration successful!');
    } else {
      console.log('❌ Registration failed');
    }
  } catch (error) {
    console.error('❌ Error testing registration:', error.message);
  }
};

const testLogin = async () => {
  try {
    console.log('\nTesting login API...');
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    const data = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Login successful!');
    } else {
      console.log('❌ Login failed');
    }
  } catch (error) {
    console.error('❌ Error testing login:', error.message);
  }
};

// Run tests
testRegistration().then(() => testLogin());
