import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInLeft } from "react-native-reanimated";

const data = [
  { id: "1", city: "Aleppo", country: "Syria" },
  { id: "2", city: "Damascus", country: "Syria" },
  { id: "3", city: "Homs", country: "Syria" },
];

const SearchSuggestion = ({ city, country }) => {
  return (
    <Animated.View
      entering={FadeInLeft.duration(500).springify().damping(8).delay(500)}
    >
      <TouchableOpacity className="flex-row justify-between items-center p-2">
        <Text style={{ fontSize: wp(4) }} className="text-white">
          {city}, {country}
        </Text>
        <Ionicons
          name="location-outline"
          size={wp(7)}
          color="white"
          className="mr-2"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function SearchSuggestionsList() {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SearchSuggestion city={item.city} country={item.country} />
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{ height: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
        />
      )}
    />
  );
}
