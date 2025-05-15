import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const mtr_id = formData.get('mtr_id');
    const unified_file = formData.get('unified_file');

    if (!mtr_id || !unified_file) {
      return NextResponse.json(
        { error: 'Missing required parameters: mtr_id and unified_file are required' },
        { status: 400 }
      );
    }

    const response = await fetch('http://20.205.169.17:3002/get_final_report', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        mtr_id: mtr_id,
        unified_file: unified_file
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Final report API error:', error);
    return NextResponse.json(
      { 
        errorType: 'Error',
        errorMessage: error.message || 'An unknown error has occurred'
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}
