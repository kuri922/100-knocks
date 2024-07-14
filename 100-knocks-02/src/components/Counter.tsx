
import { Box, Flex, Text } from "@chakra-ui/react"
import { MinusButton } from "./atoms/button/MinusBotton"
import { useState } from "react"
import { PlusButton } from "./atoms/button/PlusButton";


export const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  return (
    <Flex
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center">
      <Box
        w="250px"
        h="300px"
        bg="white"
        borderRadius="10px"
        shadow="md"
        p={4}
      >
        <Text>React Counter</Text>
        <Text
          fontSize="50px"
          fontWeight="bold"
          color="blue"
        >{count}</Text>
        <Flex
          display="flex"
          justifyContent="center"
          alignItems="center">
          <PlusButton onClick={increment} />
          <MinusButton onClick={decrement} isDisabled={count <= 0} />
        </Flex>
      </Box>
    </Flex>
  )
}

