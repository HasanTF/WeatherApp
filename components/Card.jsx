import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Card({ day, temperature, icon }) {
  return (
    <TouchableOpacity className="bg-gray-300/40 rounded-2xl px-6 justify-center items-center">
      <Text className="text-white text-xl">{day}</Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${icon}@2x.png` }}
        style={{ width: 50, height: 50 }}
      />
      <Text className="text-white text-lg">{temperature}°C</Text>
    </TouchableOpacity>
  );
}
