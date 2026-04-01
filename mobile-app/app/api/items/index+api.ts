const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

export async function GET(request: Request): Promise<Response> {
  try {
    // ✅ Extract auth header from incoming request
    const authHeader = request.headers.get('authorization')
    console.log('API Route - Auth header:', authHeader ? 'exists' : 'missing')

    const response = await fetch(`${BACKEND_URL}/api/groceries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }), // ✅ forward token
      },
    })

    console.log('Backend response status:', response.status)
    
    if (!response.ok) {
      const errorData = await response.json()
      console.log('Backend error:', errorData)
      return Response.json(
        { error: 'Failed to fetch items from backend', details: errorData },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log('Backend data:', JSON.stringify(data))
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching items:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json()

    // ✅ Extract auth header
    const authHeader = request.headers.get('authorization')

    const response = await fetch(`${BACKEND_URL}/api/groceries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }), // ✅ forward token
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to create item' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data, { status: 201 })
  } catch (error) {
    console.error('Error creating item:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}