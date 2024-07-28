import { Button, Stack } from "@chakra-ui/react"
import { FC } from "react";

type Props = {
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
}

export const TimerButtons: FC<Props> = ({ onStart, onPause, onResume, onReset }) => {
  return (
    <Stack shouldWrapChildren direction='row' display="flex">
      <Button colorScheme="teal" onClick={onStart}>スタート</Button>
      <Button colorScheme="orange" onClick={onPause}>一時停止</Button>
      <Button colorScheme="blue" onClick={onResume}>再開</Button>
      <Button colorScheme="red" onClick={onReset}>リセット</Button>
    </Stack>
  )
}
