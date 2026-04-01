

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

export async function GET(request: Request, { id }: { id: string }): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization')

    const response = await fetch(`${BACKEND_URL}/api/groceries/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Item not found' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error fetching item:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request, { id }: { id: string }): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization')
    const body = await request.json()

    const response = await fetch(`${BACKEND_URL}/api/groceries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(authHeader && { Authorization: authHeader }),
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to update item' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error('Error updating item:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { id }: { id: string }): Promise<Response> {
  try {
    const authHeader = request.headers.get('authorization')

    const response = await fetch(`${BACKEND_URL}/api/groceries/${id}`, {
      method: 'DELETE',
      headers: {
        ...(authHeader && { Authorization: authHeader }),
      },
    })

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to delete item' },
        { status: response.status }
      )
    }

    return Response.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting item:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
