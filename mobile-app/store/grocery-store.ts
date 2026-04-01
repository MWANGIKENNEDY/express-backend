import { create } from "zustand"

export type GroceryCategory = "Produce" | "Dairy" | "Bakery" | "Pantry" | "Snacks"
export type GroceryPriority = "low" | "medium" | "high"

export type GroceryItem = {
  id: string
  name: string
  category: GroceryCategory
  quantity: number
  purchased: boolean
  priority: GroceryPriority
}

export type CreateItemInput = {
  name: string
  category: GroceryCategory
  quantity: number
  priority: GroceryPriority
}

type ItemsResponse = { items: GroceryItem[] }
type ItemResponse = { item: GroceryItem }

type GroceryStore = {
  items: GroceryItem[]
  setItems: (items: GroceryItem[]) => void
  loadItems: (token: string) => Promise<GroceryItem[]>
  addItem: (input: CreateItemInput, token: string) => Promise<GroceryItem>
  updateQuantity: (id: string, quantity: number, token: string) => Promise<GroceryItem>
  togglePurchased: (id: string, token: string) => Promise<GroceryItem>
  removeItem: (id: string, token: string) => Promise<void>
  clearPurchased: (token: string) => Promise<void>
}

const API_URL = process.env.EXPO_PUBLIC_API_URL || '/api'

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  items: [],

  setItems: (items) => set({ items }),

  loadItems: async (token: string) => {
    try {
      const res = await fetch(`${API_URL}/items`, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!res.ok) {
        if (res.status === 401) throw new Error('Session expired. Please sign in again.')
        if (res.status === 500) throw new Error('Server error. Please try again later.')
        throw new Error('Failed to load items. Please check your connection.')
      }
      const payload = await res.json()
      
      console.log('Store loadItems - payload:', JSON.stringify(payload))
      
      // Handle both { items: [...] } and [...] response formats
      const items = Array.isArray(payload) ? payload : (payload.items || [])
      set({ items })
      return items
    } catch (error) {
      if (error instanceof Error) throw error
      throw new Error('Network error. Please check your connection.')
    }
  },

  addItem: async (input, token: string) => {
    const res = await fetch(`${API_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: input.name,
        category: input.category,
        quantity: Math.max(1, input.quantity),
        priority: input.priority,
      }),
    })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const payload = (await res.json()) as ItemResponse
    set((state) => ({ items: [payload.item, ...state.items] }))
    return payload.item
  },

  updateQuantity: async (id, quantity, token: string) => {
    try {
      const nextQuantity = Math.max(1, quantity)
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: nextQuantity }),
      })
      if (!res.ok) {
        if (res.status === 401) throw new Error('Session expired')
        throw new Error('Failed to update quantity')
      }
      const payload = (await res.json()) as ItemResponse
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? payload.item : item)),
      }))
      return payload.item
    } catch (error) {
      if (error instanceof Error) throw error
      throw new Error('Network error')
    }
  },

  togglePurchased: async (id, token: string) => {
    try {
      const currentItem = get().items.find((item) => item.id === id)
      if (!currentItem) throw new Error('Item not found')

      const nextPurchased = !currentItem.purchased
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ purchased: nextPurchased }),
      })
      if (!res.ok) {
        if (res.status === 401) throw new Error('Session expired')
        throw new Error('Failed to update item')
      }
      const payload = (await res.json()) as ItemResponse
      set((state) => ({
        items: state.items.map((item) => (item.id === id ? payload.item : item)),
      }))
      return payload.item
    } catch (error) {
      if (error instanceof Error) throw error
      throw new Error('Network error')
    }
  },

  removeItem: async (id, token: string) => {
    try {
      const res = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': `Bearer ${token}` },
      })
      if (!res.ok) {
        if (res.status === 401) throw new Error('Session expired')
        throw new Error('Failed to remove item')
      }
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }))
    } catch (error) {
      if (error instanceof Error) throw error
      throw new Error('Network error')
    }
  },

  clearPurchased: async (token: string) => {
    const res = await fetch(`${API_URL}/items/clear-purchased`, {
      method: "POST",
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const items = get().items.filter((item) => !item.purchased)
    set({ items })
  },
}))
