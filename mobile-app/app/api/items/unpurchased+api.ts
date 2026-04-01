

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

export async function GET(request: Request): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization')

    const response = await fetch(`${BACKEND_URL}/api/groceries/unpurchased`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch unpurchased items' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching unpurchased items:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
