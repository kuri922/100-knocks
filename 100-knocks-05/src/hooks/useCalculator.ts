import { useState } from "react";

type useCalculator = {
  displayValue: string;
  handlButtonClick: (label: string) => void;
}


export const useCalculator = (): useCalculator => {
  //���ߤ�ɽ���ͤξ��֤����
  const [displayValue, setDisplayValue] = useState<string>("0");
  //�����ͤξ��֤����
  const [preValue, setPreValue] = useState<string | null>(null);
  //���ߤα黻�Ҥξ��֤����
  const [operator, setOperator] = useState<string | null>(null);
  //���ڥ����Ե���ξ��֤����
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  //���Ϥ���Ƥ����ͤ����
  const [history, setHistory] = useState<string>("");

  // �ܥ��󤬥���å����줿�Ȥ��ν���
  const handlButtonClick = (label: string) => {
    if (label === "Clear") {
      setDisplayValue("0");
      setHistory("");
      setPreValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    // �����ܥ��󤬥���å����줿���ν���
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
    // �������ܥ��󤬥���å����줿���ν���
    if (label === ".") {
      if (!displayValue.includes(".")) {
        setDisplayValue(displayValue + ".");
        setHistory(history + label);
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(label)) {
      if (displayValue === '0' && history === '') {
        return; // �ǽ�˱黻�Ҥ������줿����̵��
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
          alert("����ǽ������뤳�ȤϤǤ��ޤ���")
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