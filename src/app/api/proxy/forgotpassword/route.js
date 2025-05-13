export async function POST(request) {
  try {
    const formData = await request.formData();
    const email = formData.get('email');

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    const response = await fetch('http://20.205.169.17:3002/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      },
      body: `email=${encodeURIComponent(email)}`
    });

    const data = await response.json();
    
    return Response.json(data, { status: response.status });
  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}


