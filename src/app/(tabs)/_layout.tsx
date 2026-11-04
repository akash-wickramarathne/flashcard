import { Tabs } from "expo-router";
import CustomTabBar from "../../components/CustomTabBar"; // මෙහි dots (..) දෙකක් තිබිය යුතුය!

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "මුල් පිටුව" }} />
      <Tabs.Screen name="add-card" options={{ title: "කාඩ් එකතු කරන්න" }} />
      <Tabs.Screen name="browse" options={{ title: "ලැයිස්තුව" }} />
      <Tabs.Screen name="settings" options={{ title: "සැකසුම්" }} />
    </Tabs>
  );
}
