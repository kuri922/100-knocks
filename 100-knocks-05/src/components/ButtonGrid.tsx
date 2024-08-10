import { SimpleGrid } from '@chakra-ui/react';
import { Button } from './Button';


interface ButtonGridProps {
  handleButtonClick: (label: string) => void;
}

const ButtonGrid: React.FC<ButtonGridProps> = ({ handleButtonClick }) => {
  return (
    <SimpleGrid columns={4} spacing={2}>
      {['7', '8', '9', '+'].map((label) => (
        <Button key={label} label={label} onClick={handleButtonClick} />
      ))}
      {['4', '5', '6', '-'].map((label) => (
        <Button key={label} label={label} onClick={handleButtonClick} />
      ))}
      {['1', '2', '3', '*'].map((label) => (
        <Button key={label} label={label} onClick={handleButtonClick} />
      ))}
      {['0', '/', '.', '='].map((label) => (
        <Button key={label} label={label} onClick={handleButtonClick} />
      ))}
      <Button label="Clear" onClick={handleButtonClick} />
    </SimpleGrid>
  );
};

export default ButtonGrid;
