import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useGroceryStore } from '@/store/grocery-store'
import type { GroceryItem, NewGroceryItem } from '@/store/grocery-store'
import { useEffect } from 'react'

export function useGroceryItems() {
  const queryClient = useQueryClient()
  const { fetchItems, createItem, setItems, addItem } = useGroceryStore()

  // Query for fetching all items
  const { data: items, isLoading, error, refetch } = useQuery({
    queryKey: ['groceryItems'],
    queryFn: fetchItems,
  })

  // Sync with Zustand store when data changes
  useEffect(() => {
    if (items) {
      setItems(items)
    }
  }, [items, setItems])

  // Mutation for creating a new item
  const createMutation = useMutation({
    mutationFn: createItem,
    onSuccess: (newItem) => {
      // Optimistically update Zustand store
      addItem(newItem)
      
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['groceryItems'] })
    },
  })

  return {
    items: items || [],
    isLoading,
    error,
    refetch,
    createItem: createMutation.mutate,
    isCreating: createMutation.isPending,
    createError: createMutation.error,
  }
}
