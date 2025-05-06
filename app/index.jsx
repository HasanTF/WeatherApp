import { Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 items-center justify-around">
      <LinearGradient
        colors={["#9e00ff", "#470000"]}
        className="absolute left-0 right-0 top-0 bottom-0 z-[-1]"
      />
      <Animated.Image
        entering={FadeInDown.duration(500).springify().damping(8)}
        source={require("../assets/images/WelcomeIcon.png")}
        style={{ width: wp(50), height: wp(50) }}
      />
      <Animated.View
        entering={FadeInDown.duration(500).delay(500).springify().damping(8)}
      >
        <Text
          style={{ fontSize: wp(16) }}
          className="font-extrabold text-center text-white"
        >
          Weather
        </Text>
        <Text
          style={{ fontSize: wp(16) }}
          className="font-medium text-center text-amber-500"
        >
          Forecasts
        </Text>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.duration(500).delay(1000).springify().damping(8)}
      >
        <TouchableOpacity
          onPress={() => router.push("/homeScreen")}
          className="px-28 py-6 bg-amber-500 rounded-[35]"
        >
          <Text className="font-bold text-2xl">Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
