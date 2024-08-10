import { useState } from "react";

type useCalculator = {
  displayValue: string;
  handlButtonClick: (label: string) => void;
}


export const useCalculator = (): useCalculator => {
  //現在の表示値の状態を管理
  const [displayValue, setDisplayValue] = useState<string>("0");
  //前の値の状態を管理
  const [preValue, setPreValue] = useState<string | null>(null);
  //現在の演算子の状態を管理
  const [operator, setOperator] = useState<string | null>(null);
  //オペランド待機中の状態を管理
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  //入力されている値を管理
  const [history, setHistory] = useState<string>("");

  // ボタンがクリックされたときの処理
  const handlButtonClick = (label: string) => {
    if (label === "Clear") {
      setDisplayValue("0");
      setHistory("");
      setPreValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    // 数字ボタンがクリックされた場合の処理
    if (!isNaN(Number(label))) {
      if (waitingForOperand) {
        setDisplayValue(label);
        setWaitingForOperand(false);
      } else {
        setDisplayValue(displayValue === "0" ? label : displayValue + label);
      }
      setHistory(history + label);
      return;
    }
    // 小数点ボタンがクリックされた場合の処理
    if (label === ".") {
      if (!displayValue.includes(".")) {
        setDisplayValue(displayValue + ".");
        setHistory(history + label);
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(label)) {
      if (displayValue === '0' && history === '') {
        return; // 最初に演算子が押された場合は無視
      }
      if (operator && waitingForOperand) {
        setOperator(label);
        setHistory(history.slice(0, -1) + label);
        return;
      }
      if (preValue === null) {
        setPreValue(displayValue);
      } else if (operator) {
        const result = preforCalculation(preValue, displayValue, operator);
        setDisplayValue(String(result));
        setPreValue(String(result));
      }
      setOperator(label);
      setWaitingForOperand(true);
      setHistory(history + label);
      return;
    }

    if (label === "=") {
      if (operator && preValue !== null) {
        const result = preforCalculation(preValue, displayValue, operator);
        setDisplayValue(String(result));
        setPreValue(null);
        setOperator(null);
        setWaitingForOperand(false);
        setHistory(String(result));
      }
      return;
    }
  };

  const preforCalculation = (prev: string, current: string, operator: string): number => {
    const preNumber = parseFloat(prev);
    const currentNumber = parseFloat(current);

    switch (operator) {
      case "+":
        return preNumber + currentNumber;
      case "-":
        return preNumber - currentNumber;
      case "*":
        return preNumber * currentNumber;
      case "/":
        if (currentNumber === 0) {
          alert("ゼロで除算することはできません")
          return preNumber
        }
        return preNumber / currentNumber;
      default:
        return currentNumber;

    }
  };

  return {
    displayValue: history,
    handlButtonClick
  }
};