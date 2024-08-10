import { Box, Grid } from "@chakra-ui/react"
import { useCalculator } from "../hooks/useCalculator"
import ButtonGrid from "./ButtonGrid";
import Display from "./Display";

export const Calculator: React.FC = () => {
  const { displayValue, handlButtonClick } = useCalculator();
  return (
    <Box maxW="250px" mx="auto" mt={10} bg="gray.800" p={4} borderRadius="md">
      <Display value={displayValue} />
      <ButtonGrid handleButtonClick={handlButtonClick} />

    </Box>
  )
}