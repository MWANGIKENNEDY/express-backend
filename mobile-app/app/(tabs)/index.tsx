import { useAuth, Show } from '@clerk/expo'
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  Platform,
} from 'react-native'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import TabScreenBackground from '@/components/TabScreenBg'
import ListHeroCard from '@/components/list/ListHeroCard'
import PendingItemCard from '@/components/list/PendingItemCard'
import CompletedItems from '@/components/list/CompletedItems'
import { useGroceryStore } from '@/store/grocery-store'

export default function Page() {
  const { getToken, isSignedIn, isLoaded } = useAuth()
  const { loadItems } = useGroceryStore()

  const {
    data: items = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['groceries'],
    queryFn: async () => {
      const token = await getToken()
      if (!token) throw new Error('No auth token')
      return await loadItems(token)
    },
    enabled: !!isSignedIn,
  })

  const pendingItems = useMemo(
    () => items.filter((item) => item != null && !item.purchased),
    [items]
  )

  // ⏳ Wait for Clerk to load
  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  // Not signed in state is handled by layout redirect, but just in case:
  if (!isSignedIn) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-foreground text-center px-6">
          Please sign in to view your grocery list
        </Text>
      </View>
    )
  }

  // LOADING
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
        <Text className="mt-2 text-muted-foreground">
          Loading items...
        </Text>
      </View>
    )
  }

  // ERROR
  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Text className="text-destructive mb-2 text-center">
          {(error as Error).message}
        </Text>
        <Pressable onPress={() => refetch()}>
          <Text className="text-primary">Tap to retry</Text>
        </Pressable>
      </View>
    )
  }

  // SUCCESS - FlatList at root ensures iOS native tabs inset and bounce behaviors work reliably
  return (
    <FlatList
      className="flex-1 bg-background"
      data={pendingItems}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PendingItemCard item={item} />
      )}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: Platform.OS === 'android' ? 100 : 20, // Add bottom clearance for Android tab bar
        gap: 14,
        flexGrow: 1, // ensures scroll even with few items
      }}
      contentInsetAdjustmentBehavior="automatic"
      bounces={true} // iOS elastic feel
      alwaysBounceVertical={true} // Ensure bounce happens even if items are few
      overScrollMode="always" // Android scroll feedback
      refreshing={isLoading} // pull-to-refresh
      onRefresh={refetch}
      ListHeaderComponent={
        <View style={{ gap: 14, paddingTop: 20 }}>
          <TabScreenBackground />
          <ListHeroCard />

          <View className="flex-row items-center justify-between px-1">
            <Text className="text-sm font-semibold uppercase tracking-[1px] text-muted-foreground">
              Shopping items
            </Text>
            <Text className="text-sm text-muted-foreground">
              {pendingItems.length} active
            </Text>
          </View>
        </View>
      }
      ListFooterComponent={<CompletedItems />}
      ListEmptyComponent={
        <Text className="text-center text-muted-foreground py-6">
          No items yet. Add something 🛒
        </Text>
      }
    />
  )
}