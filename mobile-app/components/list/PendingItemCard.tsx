import { GroceryItem, useGroceryStore } from "@/store/grocery-store"
import { FontAwesome6 } from "@expo/vector-icons"
import { Pressable, Text, View, Alert } from "react-native"
import { useAuth } from "@clerk/expo"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const priorityPillBg = {
  low: "bg-priority-low",
  medium: "bg-priority-medium",
  high: "bg-priority-high",
}

const priorityPillText = {
  low: "text-priority-low-foreground",
  medium: "text-priority-medium-foreground",
  high: "text-priority-high-foreground",
}

const PendingItemCard = ({ item }: { item: GroceryItem }) => {
  const { removeItem, updateQuantity, togglePurchased } = useGroceryStore()
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  const toggleMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('Authentication required')
      return togglePurchased(item.id, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceries'] }),
    onError: (error) => {
      Alert.alert('Error', `Failed to update item: ${(error as Error).message}`)
    },
  })

  const quantityMutation = useMutation({
    mutationFn: async (newQuantity: number) => {
      const token = await getToken()
      if (!token) throw new Error('Authentication required')
      return updateQuantity(item.id, newQuantity, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceries'] }),
    onError: (error) => {
      Alert.alert('Error', `Failed to update quantity: ${(error as Error).message}`)
    },
  })

  const removeMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('Authentication required')
      return removeItem(item.id, token)
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['groceries'] }),
    onError: (error) => {
      Alert.alert('Error', `Failed to remove item: ${(error as Error).message}`)
    },
  })

  return (
    <View className="rounded-3xl border border-border bg-card p-4">
      <View className="flex-row items-start gap-3">
        <Pressable
          className="mt-1 size-6 items-center justify-center rounded-full border-2 border-border bg-card"
          onPress={() => toggleMutation.mutate()}
          disabled={toggleMutation.isPending}
        ></Pressable>

        <View className="flex-1">
          <View className="flex-row items-center justify-between gap-2">
            <Text className="flex-1 text-lg font-semibold text-card-foreground">{item.name}</Text>
            <View className={`rounded-full px-3 py-1 ${priorityPillBg[item.priority]}`}>
              <Text className={`text-xs font-bold uppercase ${priorityPillText[item.priority]}`}>
                {item.priority}
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center gap-2">
            <View className="rounded-full bg-secondary px-3 py-1">
              <Text className="text-xs font-semibold text-secondary-foreground">
                {item.category}
              </Text>
            </View>
          </View>

          <View className="mt-3 flex-row items-center gap-2">
            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => quantityMutation.mutate(Math.max(1, item.quantity - 1))}
              disabled={quantityMutation.isPending}
            >
              <FontAwesome6 name="minus" size={12} color="#3b5a4a" />
            </Pressable>

            <Text className="min-w-9 text-center text-base font-semibold text-foreground">
              {item.quantity}
            </Text>

            <Pressable
              className="h-8 w-8 items-center justify-center rounded-xl border border-border bg-muted"
              onPress={() => quantityMutation.mutate(item.quantity + 1)}
              disabled={quantityMutation.isPending}
            >
              <FontAwesome6 name="plus" size={12} color="#3b5a4a" />
            </Pressable>
          </View>
        </View>

        <Pressable
          className="h-9 w-9 items-center justify-center rounded-xl bg-destructive"
          onPress={() => removeMutation.mutate()}
          disabled={removeMutation.isPending}
        >
          <FontAwesome6 name="trash" size={13} color="#d45f58" />
        </Pressable>
      </View>
    </View>
  );
};

export default PendingItemCard;