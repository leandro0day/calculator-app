import { Text, Pressable, Platform } from "react-native";
import React from "react";
import { globalStyles } from "@/styles/global-styles";
import { Colors } from "@/constants/Colors";
import * as Haptics from 'expo-haptics';

const isAndroid = Platform.OS == "android";


interface Props {
  label: string;
  color?: string;
  blackText?: boolean;
  doubleSize?: boolean;
  onPress: () => void;
}

const CalculatorButton = ({
  label,
  color = Colors.darkGray,
  blackText = false,
  doubleSize = false,
  onPress,
}: Props) => {
  return (
    <Pressable
      style={({ pressed }) => ({
        ...globalStyles.button,
        backgroundColor: color,
        opacity: pressed ? 0.8 : 1,
        width: doubleSize ? 180 : 80
      })}
      onPress={() => {
        if (isAndroid) {
          Haptics.selectionAsync()
        }
        onPress()
      }}
    >
      <Text
        style={{
          ...globalStyles.buttonText,
          color: blackText ? "black" : "white",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
};

export default CalculatorButton;
