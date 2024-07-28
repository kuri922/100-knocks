import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  VStack,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { TimerButtons } from './TimerButtons';
import useSound from 'use-sound';
import { InputTime } from './InputTime';


export const Main: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isAlarmPlayed, setIsAlarmPlayed] = useState<boolean>(false); // 効果音が再生されたかどうかの状態
  const toast = useToast();

  // 効果音の設定
  const [play] = useSound("/alerm-sound.mp3")

  // カウントダウンを管理するuseEffect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      if (!isAlarmPlayed) {
        play(); // 効果音を再生
        setIsAlarmPlayed(true); // 効果音が再生されたことを記録
      }
      setIsActive(false); // タイマーを停止
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, play, isAlarmPlayed]);

  // スタートボタンを押したときの処理
  const handleStart = () => {
    const totalSeconds = minutes * 60 + seconds;
    if (totalSeconds <= 0 || totalSeconds > 3600) {
      toast({
        title: '無効な時間',
        description: '0より大きく、60分以内の値を入力してください。',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setTimeLeft(totalSeconds);
    setIsActive(true);
  };
  // 一時停止ボタンを押したときの処理
  const handlePause = () => setIsActive(false);

  // 再開ボタンを押したときの処理
  const handleResume = () => setIsActive(true);

  // リセットボタンを押したときの処理
  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(minutes * 60 + seconds);
  };

  return (
    <Box textAlign="center" p={5}>
      <Heading mb={20}>カウントダウンタイマー</Heading>
      <VStack spacing={4} >
        <InputTime
          minutes={minutes}
          seconds={seconds}
          setMinutes={setMinutes}
          setSeconds={setSeconds} />

        <TimerButtons
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onReset={handleReset}
        />
        <Text fontSize="60px">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </Text>
      </VStack>
    </Box>
  );
};

