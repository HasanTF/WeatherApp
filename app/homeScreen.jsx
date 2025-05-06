import { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInLeft, FadeInRight } from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Card from "../components/Card";
import SearchSuggestion from "../components/SearchSuggestion";

const API_KEY = "239babed90796b57c03e951aba30f662";

export default function App() {
  const [searchBar, setSearchBar] = useState(false);
  const [city, setCity] = useState("Aleppo");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeatherData(data);
        setError(null);
      } else {
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  // Fetch 5-day forecast data
  const fetchForecast = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === "200") {
        // Group forecast data by day
        const groupedForecast = groupForecastByDay(data.list);
        setForecastData(groupedForecast);
      } else {
        setError(data.message || "Failed to fetch forecast data");
      }
    } catch (err) {
      setError("Failed to fetch forecast data");
    } finally {
      setLoading(false);
    }
  };

  // Group forecast data by day
  const groupForecastByDay = (forecastList) => {
    const grouped = {};
    forecastList.forEach((item) => {
      const date = item.dt_txt.split(" ")[0];
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(item);
    });
    return Object.values(grouped).slice(0, 5);
  };

  // Handle city search
  const handleSearch = (text) => {
    setCity(text);
  };

  useEffect(() => {
    fetchWeather(city);
    fetchForecast(city);
  }, [city]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ffffff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <Text className="text-black text-2xl text-center">{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 items-center justify-around">
      <LinearGradient
        colors={["#9e00ff", "#470000"]}
        className="absolute left-0 right-0 top-0 bottom-0 z-[-1]"
      />

      {/* search bar */}
      <View>
        <Animated.View
          style={{ width: wp(90) }}
          className={
            searchBar
              ? "flex-row justify-end items-center rounded-3xl mx-4 pl-4 bg-gray-800/50"
              : "flex-row justify-end items-center rounded-3xl mx-4 pl-4 transparent"
          }
        >
          {searchBar ? (
            <Animated.View
              entering={FadeInLeft.duration(500).springify().damping(8)}
              className="flex-1"
            >
              <TextInput
                placeholder="Search city.."
                placeholderTextColor={"white"}
                className="flex-1 text-base text-white"
                onChangeText={handleSearch}
                value={city}
              />
            </Animated.View>
          ) : null}
          <TouchableOpacity
            className="rounded-full p-3 m-1 bg-gray-300/40"
            onPress={() => setSearchBar((state) => !state)}
          >
            <AntDesign name="search1" size={25} color={"white"} />
          </TouchableOpacity>
        </Animated.View>
        {searchBar ? (
          <View
            className="flex-row justify-end items-center rounded-3xl mx-4 pl-4 bg-gray-800/30"
            style={{ height: hp(20) }}
          >
            <SearchSuggestion />
          </View>
        ) : null}
      </View>

      {/* location name */}
      <Animated.View
        entering={FadeInLeft.duration(500).delay(1000).springify().damping(8)}
        className="flex-row items-end"
      >
        <Text
          style={{ fontSize: wp(6.5) }}
          className="text-white text-center font-bold"
        >
          {weatherData?.name},{" "}
        </Text>
        <Text
          style={{ fontSize: wp(5) }}
          className="font-semibold text-gray-300"
        >
          {weatherData?.sys?.country}
        </Text>
      </Animated.View>

      {/* weather details */}
      <Animated.View
        entering={FadeInRight.duration(500).delay(1500).springify().damping(8)}
      >
        <Image
          source={require("../assets/images/WelcomeIcon.png")}
          style={{ width: wp(50), height: wp(50) }}
        />

        <Text
          style={{ fontSize: wp(12) }}
          className="text-white text-center font-bold mt-6"
        >
          {Math.round(weatherData?.main?.temp)}°
        </Text>
        <Text style={{ fontSize: wp(6) }} className="text-white text-center ">
          {weatherData?.weather[0]?.description}
        </Text>
      </Animated.View>

      {/* more details */}
      <Animated.View
        entering={FadeInLeft.duration(500).delay(2000).springify().damping(8)}
        className="flex-row w-full justify-around px-4"
      >
        <View className="flex-row gap-2">
          <Image
            source={require("../assets/images/wind.png")}
            className="h-6 w-6"
          />
          <Text className="text-white text-center">
            {weatherData?.wind?.speed} km/h
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Image
            source={require("../assets/images/drop.png")}
            className="h-6 w-6"
          />
          <Text className="text-white text-center">
            {weatherData?.main?.humidity}%
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Image
            source={require("../assets/images/sun.png")}
            className="h-6 w-6"
          />
          <Text className="text-white text-center">
            {new Date(weatherData?.sys?.sunrise * 1000).toLocaleTimeString()}
          </Text>
        </View>
      </Animated.View>

      {/* daily forecast */}
      <Animated.View
        entering={FadeInRight.duration(500).delay(2500).springify().damping(8)}
        style={{ height: hp(20), width: wp(100) }}
      >
        <View className="flex-row items-center w-full gap-2 ml-8 mb-3">
          <AntDesign name="calendar" size={wp(6)} color="white" />
          <Text style={{ fontSize: wp(4) }} className="text-white">
            Daily forecast
          </Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: wp(5),
            gap: wp(2),
          }}
        >
          {forecastData.map((day, index) => (
            <Card
              key={index}
              day={new Date(day[0].dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
              temperature={Math.round(day[0].main.temp)}
              icon={day[0].weather[0].icon}
            />
          ))}
        </ScrollView>
      </Animated.View>

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}
