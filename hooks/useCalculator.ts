import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  subtract = "-",
  multiply = "x",
  divide = "%",
}
export const useCalculator = () => {
  const [formula, setFormula] = useState("");

  const [number, setNumber] = useState("0");
  const [prevNumber, setPreNumber] = useState("0");

  const lastOperator = useRef<Operator>();

  useEffect(() => {
    if (lastOperator.current) {
      const firstFormulaPart = formula.split(" ").at(0);
      setFormula(`${firstFormulaPart} ${lastOperator.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateSubResult();
    setPreNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setNumber("0");
    setPreNumber("0");
    setFormula("0");

    lastOperator.current = undefined;
  };

  const toggleSign = () => {
    if (number.includes("-")) {
      return setNumber(number.replace("-", ""));
    }

    setNumber("-" + number);
  };

  const deleteLast = () => {
    let currentSing = "";
    let temporalNumber = number;

    if (number.includes("-")) {
      currentSing = "-";
      temporalNumber = number.substring(1);
    }

    if (temporalNumber.length > 1) {
      return setNumber(currentSing + temporalNumber.slice(0, -1));
    }

    if (formula) return;

    setNumber("0");
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith(".")) {
      setPreNumber(number.slice(0, -1));
    }
    setPreNumber(number);
    setNumber("0");
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.divide;
  };

  const multiplyOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.multiply;
  };

  const subtractOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.subtract;
  };

  const addOperation = () => {
    setLastNumber();
    lastOperator.current = Operator.add;
  };

  const calculateSubResult = () => {
    const [firstValue, operation, secondValue] = formula.split(" ");
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num1)) return 0;

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        if (num2 === 0) {
          return "No se puede dividir entre 0";
        }
        return num1 / num2;
      default:
        throw new Error(`Operation ${operation} not implemented`);
    }
  };
  const calculateResult = () => {
    const result = calculateSubResult();

    if (typeof result === "string") {
      clean();
      return;
    }
    setFormula(`${result}`);

    lastOperator.current = undefined;
    setPreNumber("0");
  };

  const buildNumber = (numberString: string) => {
    //Verificar si ya existe el punto decimal

    if (number.includes(".") && numberString === ".") return;

    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }

      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      if (numberString === "0" && !number.includes(".")) return;
    }

    setNumber(number + numberString);
  };

  return {
    //Props
    formula,
    number,
    prevNumber,

    //Methods
    buildNumber,
    clean,
    toggleSign,
    deleteLast,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateSubResult,
    calculateResult,
  };
};
