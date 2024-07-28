import { HStack, Input, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  minutes: number;
  seconds: number
  setMinutes: (value: number) => void
  setSeconds: (value: number) => void
}

export const InputTime: FC<Props> = (
  { minutes, seconds, setMinutes, setSeconds }
) => {


  return (
    <HStack spacing='24px' mb={20}>
      <Text>分</Text>
      <Input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value))}
        placeholder="分"
        width="100px"
      />
      <Text>秒</Text>
      <Input
        type="number"
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
        placeholder="秒"
        width="100px"
      />
    </HStack>
  )
}