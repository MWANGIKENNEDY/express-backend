import { useGroceryStore } from "@/store/grocery-store"
import { FontAwesome6 } from "@expo/vector-icons"
import { Pressable, Text, View, Alert } from "react-native"
import { useAuth } from "@clerk/expo"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const CompletedItems = () => {
  const { removeItem, togglePurchased, items } = useGroceryStore()
  const { getToken } = useAuth()
  const queryClient = useQueryClient()
  const completedItems = items.filter((item) => item != null && item.purchased)

  const toggleMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      if (!token) throw new Error('Authentication required')
      return togglePurchased(id, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceries'] }),
    onError: (error) => {
      Alert.alert('Error', `Failed to update item: ${(error as Error).message}`)
    },
  })

  const removeMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken()
      if (!token) throw new Error('Authentication required')
      return removeItem(id, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceries'] }),
    onError: (error) => {
      Alert.alert('Error', `Failed to remove item: ${(error as Error).message}`)
    },
  })

  if (!completedItems.length) return null

  return (
    <View className="mt-3 rounded-3xl border border-border bg-secondary p-4">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-secondary-foreground">
        Completed
      </Text>

      {completedItems.map((item) => (
        <View
          key={item.id}
          className="mt-3 flex-row items-center justify-between rounded-2xl border border-border bg-card px-3 py-2"
        >
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => toggleMutation.mutate(item.id)}
              className="h-6 w-6 items-center justify-center rounded-full bg-primary"
              disabled={toggleMutation.isPending}
            >
              <FontAwesome6 name="check" size={12} color="#ffffff" />
            </Pressable>
            <Text className="text-base text-muted-foreground line-through">{item.name}</Text>
          </View>

          <Pressable
            onPress={() => removeMutation.mutate(item.id)}
            className="h-8 w-8 items-center justify-center rounded-xl bg-destructive"
            disabled={removeMutation.isPending}
          >
            <FontAwesome6 name="trash" size={12} color="#d45f58" />
          </Pressable>
        </View>
      ))}
    </View>
  )
}
export default CompletedItems