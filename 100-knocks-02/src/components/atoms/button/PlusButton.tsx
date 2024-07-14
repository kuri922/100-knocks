import { Button } from "@chakra-ui/react"
import { FC } from "react"

type Props = {
  onClick: () => void;
}

export const PlusButton: FC<Props> = ({ onClick }) => {
  return (
    <Button
      borderRadius="50%"
      mr={50}
      _hover={{ cursor: "pointer" }}
      colorScheme="teal"
      size='lg'
      backgroundColor="skyblue"
      fontSize="50px"
      w="50px"
      h="50px"
      onClick={onClick}>
      +
    </Button>
  )
}
