import { useGroceryStore } from "@/store/grocery-store";
import { Text, View } from "react-native";

const ListHeroCard = () => {
  const { items } = useGroceryStore();

  const validItems = items.filter((item) => item != null);
  const completedCount = validItems.filter((item) => item.purchased).length;
  const pendingCount = validItems.length - completedCount;
  const completionRate = validItems.length ? Math.round((completedCount / validItems.length) * 100) : 0;

  return (
    <View className="rounded-3xl bg-primary p-5">
      <Text className="text-sm font-semibold uppercase tracking-[1px] text-primary-foreground/70">
        Today
      </Text>

      <Text className="mt-1 text-3xl font-extrabold text-primary-foreground">
        Your Grocery Board
      </Text>

      <Text className="mt-1 text-sm text-primary-foreground/80">
        {pendingCount} pending · {completedCount} completed
      </Text>

      <View className="mt-4 overflow-hidden rounded-full bg-white/50">
        <View className="h-2 rounded-full bg-secondary" style={{ width: `${completionRate}%` }} />
      </View>
    </View>
  );
};

export default ListHeroCard;