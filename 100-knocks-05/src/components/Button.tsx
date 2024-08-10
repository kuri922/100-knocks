import { Button as ChakraButton } from "@chakra-ui/react";


type ButtonProps = {
  label: string;
  onClick: (label: string) => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <ChakraButton m={1} p={6} fontSize="xl" onClick={() => onClick(label)} bg="gray.200">
      {label}
    </ChakraButton>
  )
}

