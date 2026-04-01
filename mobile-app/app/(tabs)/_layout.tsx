import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { useColorScheme } from "nativewind";
import { Platform } from "react-native";

export default function TabsLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === "dark";

  const activeColor = isDark
    ? "hsl(142 70% 54%)"
    : "hsl(147 75% 33%)";

  const inactiveColor = isDark
    ? "rgba(255,255,255,0.5)"
    : "rgba(0,0,0,0.5)";

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return (
    <NativeTabs
      tintColor={activeColor}
      labelStyle={{ fontSize: 12 }}
    >
      {/* LIST TAB */}
      <NativeTabs.Trigger name="index">
        <Label>List</Label>
        <Icon
          {...Platform.select({
            ios: {
              sf: {
                default: "list.bullet.clipboard",
                selected: "list.bullet.clipboard.fill",
              },
            },
            android: {
              drawable: "ic_menu_agenda",
            },
          })}
        />
      </NativeTabs.Trigger>

      {/* PLANNER TAB */}
      <NativeTabs.Trigger name="planner">
        <Label>Planner</Label>
        <Icon
          {...Platform.select({
            ios: {
              sf: {
                default: "plus.circle",
                selected: "plus.circle.fill",
              },
            },
            android: {
              drawable: "ic_input_add",
            },
          })}
        />
      </NativeTabs.Trigger>

      {/* PROFILE TAB */}
      <NativeTabs.Trigger name="profile">
        <Label>Profile</Label>
        <Icon
          {...Platform.select({
            ios: {
              sf: {
                default: "person.circle",
                selected: "person.circle.fill",
              },
            },
            android: {
              drawable: "ic_menu_myplaces",
            },
          })}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}