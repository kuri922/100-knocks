import { Button } from "@chakra-ui/react"
import { FC } from "react";

type Props = {
  onClick: () => void;
  isDisabled: boolean;
}
export const MinusButton: FC<Props> = ({ onClick, isDisabled }) => {
  return (
    <Button
      borderRadius="50%"
      _hover={{ cursor: "pointer" }}
      colorScheme="teal"
      fontSize="50px"
      w="50px"
      h="50px"
      pb={8}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      -
    </Button>
  )
}
