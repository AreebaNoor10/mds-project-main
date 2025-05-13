import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const mds_name = formData.get('mds_name');
    const grade_label = formData.get('grade_label');

    console.log('Making request to unified output API with:', { mds_name, grade_label });

    const response = await fetch('http://20.205.169.17:3002/get_unified_output', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
      },
      body: new URLSearchParams({
        mds_name: mds_name,
        grade_label: grade_label
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API responded with status ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Invalid content type:', contentType, 'Response:', text);
      throw new Error('Invalid response format from API');
    }

    const data = await response.json();
    console.log('API Response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in getunifiedoutput route:', error);
    return NextResponse.json(
      { 
        error: error.message,
        details: error.stack
      }, 
      { status: 500 }
    );
  }
}
