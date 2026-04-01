import { useGroceryStore } from "@/store/grocery-store";
import { Pressable, Text, Alert } from "react-native";
import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ClearCompletedButton() {
  const { clearPurchased } = useGroceryStore();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  const clearMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      if (!token) throw new Error("Authentication required");
      return clearPurchased(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groceries"] });
    },
    onError: (error) => {
      Alert.alert("Error", `Failed to clear items: ${(error as Error).message}`);
    },
  });

  return (
    <Pressable
      className="rounded-2xl bg-primary py-3"
      onPress={() => clearMutation.mutate()}
      disabled={clearMutation.isPending}
    >
      <Text className="text-center text-base font-semibold text-primary-foreground">
        {clearMutation.isPending ? "Clearing..." : "Clear completed items"}
      </Text>
    </Pressable>
  );
}
