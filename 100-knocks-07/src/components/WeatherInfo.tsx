import { Box, Image, Text } from "@chakra-ui/react";
import { WeatherData } from "./Weather";

type WeatherInfoProps = {
  weatherData: WeatherData;
  cityName: string;
}

export const WeatherInfo: React.FC<WeatherInfoProps> = ({ weatherData, cityName }) => {
  return (

    <Box bg="lightblue" p={5} borderRadius="md" mb={4}>
      <Text fontSize="2xl" mb={2}>
        {cityName}の天気 ({weatherData.date})
      </Text>
      <Image
        boxSize="100px"
        src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
        alt={weatherData.description}
        mb={2}
      />
      <Text fontSize="xl">
        最高気温: {weatherData.temp_max}°C
      </Text>
      <Text fontSize="xl">
        最低気温: {weatherData.temp_min}°C
      </Text>
    </Box>
  );
}
