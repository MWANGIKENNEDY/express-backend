import { View, Text, Pressable, Image } from 'react-native'
import { useAuth, useUser } from '@clerk/expo'

export default function ProfileScreen() {
  const { signOut } = useAuth()
  const { user } = useUser()

  return (
    <View className="flex-1 items-center bg-background px-6 pt-12">
      {/* HEADER SECTION */}
      <View className="items-center mt-12 mb-8">
        <View className="w-24 h-24 rounded-full bg-muted border-2 border-border mb-4 overflow-hidden items-center justify-center">
          {user?.imageUrl ? (
            <Image 
              source={{ uri: user.imageUrl }} 
              className="w-full h-full"
            />
          ) : (
            <Text className="text-3xl font-bold text-muted-foreground uppercase">
              {user?.firstName?.charAt(0) || user?.primaryEmailAddress?.emailAddress?.charAt(0) || '?'}
            </Text>
          )}
        </View>

        <Text className="text-2xl font-bold text-foreground">
          {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'My Profile'}
        </Text>
        <Text className="text-muted-foreground mt-2 text-base">
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      {/* ACTION SECTION */}
      <View className="w-full mt-6">
        <Pressable 
          onPress={() => signOut()}
          className="w-full bg-destructive/10 border border-destructive/20 py-4 rounded-xl flex-row justify-center items-center active:bg-destructive/20"
        >
          <Text className="text-destructive font-semibold text-lg">Sign Out</Text>
        </Pressable>
      </View>
    </View>
  )
}
