import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const mds_name = formData.get('mds_name');
    const grade_label = formData.get('grade_label');

    console.log('Making request to unified output API with:', { mds_name, grade_label });

    // Add timeout to the fetch request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch('http://20.205.169.17:3002/get_unified_output', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
        },
        body: new URLSearchParams({
          mds_name: mds_name,
          grade_label: grade_label
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          body: errorText,
          url: response.url
        });
        
        return NextResponse.json(
          { 
            errorType: 'APIError',
            errorMessage: `API responded with status ${response.status}: ${errorText}`,
            details: {
              status: response.status,
              statusText: response.statusText,
              url: response.url
            }
          },
          { 
            status: response.status,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }
        );
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Invalid content type:', contentType, 'Response:', text);
        return NextResponse.json(
          { 
            errorType: 'InvalidResponse',
            errorMessage: 'Invalid response format from API',
            details: {
              contentType,
              responseText: text
            }
          },
          { 
            status: 500,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }
        );
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      return NextResponse.json(data, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      });
    } catch (fetchError) {
      clearTimeout(timeoutId);
      console.error('Fetch error:', fetchError);
      
      // Check if it's a timeout error
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            errorType: 'TimeoutError',
            errorMessage: 'Request timed out after 10 seconds',
            details: fetchError
          },
          { 
            status: 504,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }
        );
      }

      // Check if it's a network error
      if (fetchError.message.includes('Failed to fetch') || fetchError.message.includes('NetworkError')) {
        return NextResponse.json(
          { 
            errorType: 'NetworkError',
            errorMessage: 'Unable to connect to the API server. Please check if the server is running and accessible.',
            details: fetchError
          },
          { 
            status: 502,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
          }
        );
      }

      throw fetchError; // Re-throw other errors to be caught by outer try-catch
    }
  } catch (error) {
    console.error('Error in getunifiedoutput route:', error);
    return NextResponse.json(
      { 
        errorType: 'Error',
        errorMessage: error.message || 'An unknown error has occurred',
        details: error.stack
      }, 
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
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
