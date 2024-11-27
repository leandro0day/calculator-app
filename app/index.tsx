import CalculatorButton from "@/components/CalculatorButton";
import ThemeText from "@/components/ThemeText";
import { Colors } from "@/constants/Colors";
import { useCalculator } from "@/hooks/useCalculator";
import { globalStyles } from "@/styles/global-styles";
import { View } from "react-native";

const CalculatorApp = () => {
  const {
    formula,
    prevNumber,
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  } = useCalculator();
  return (
    <View style={globalStyles.calculatorContainer}>
      {/* Resultados */}
      <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
        <ThemeText variant="h1">{formula}</ThemeText>
        {formula === prevNumber ? (
          <ThemeText variant="h2"> </ThemeText>
        ) : (
          <ThemeText variant="h2">{prevNumber}</ThemeText>
        )}
      </View>

      {/* Filas de Botones */}
      <View style={globalStyles.row}>
        <CalculatorButton
          blackText={true}
          color={Colors.lightGray}
          onPress={clean}
          label="AC"
        ></CalculatorButton>
        <CalculatorButton
          blackText={true}
          color={Colors.lightGray}
          onPress={toggleSign}
          label="+/-"
        ></CalculatorButton>
        <CalculatorButton
          blackText={true}
          color={Colors.lightGray}
          onPress={deleteLast}
          label="del"
        ></CalculatorButton>
        <CalculatorButton
          onPress={divideOperation}
          label="%"
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => buildNumber("7")}
          label="7"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("8")}
          label="8"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("9")}
          label="9"
        ></CalculatorButton>
        <CalculatorButton
          onPress={multiplyOperation}
          label="X"
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => buildNumber("4")}
          label="4"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("5")}
          label="5"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("6")}
          label="6"
        ></CalculatorButton>
        <CalculatorButton
          onPress={subtractOperation}
          label="-"
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton
          onPress={() => buildNumber("1")}
          label="1"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("2")}
          label="2"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber("3")}
          label="3"
        ></CalculatorButton>
        <CalculatorButton
          onPress={addOperation}
          label="+"
          color={Colors.orange}
        ></CalculatorButton>
      </View>
      <View style={globalStyles.row}>
        <CalculatorButton
          doubleSize={true}
          onPress={() => buildNumber("0")}
          label="0"
        ></CalculatorButton>
        <CalculatorButton
          onPress={() => buildNumber(".")}
          label="."
        ></CalculatorButton>
        <CalculatorButton
          onPress={calculateResult}
          label="="
          color={Colors.orange}
        ></CalculatorButton>
      </View>
    </View>
  );
};

export default CalculatorApp;
