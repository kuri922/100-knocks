import { Box, Text, Flex } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { WeatherInfo } from "./WeatherInfo";

// OpenWeatherMap APIキーと都市名を設定
const API_KEY = "b2ebeebf7ccc898044c01f46070651df";
const CITY_NAME = "OSAKA";

// OpenWeatherMap APIのレスポンス型を定義
interface WeatherApiResponse {
  list: WeatherApiItem[];
}

interface WeatherApiItem {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

// 天気予報のデータ型を定義
export interface WeatherData {
  date: string;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
}

export const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  // 天気予報データを取得する関数
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get<WeatherApiResponse>(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&units=metric`
        );
        const data = response.data.list;

        // データをフォーマットして、1日ごとの天気情報を取得
        const formattedData: WeatherData[] = data
          .filter((_, index) => index % 8 === 0) // 8つごとにデータを取得して1日分を取得
          .map((item: WeatherApiItem) => ({
            date: new Date(item.dt_txt).toLocaleDateString(),
            temp_max: item.main.temp_max,
            temp_min: item.main.temp_min,
            description: item.weather[0].description,
            icon: item.weather[0].icon,
          }));

        // 今日、明日、明後日のデータを設定
        setWeatherData(formattedData.slice(0, 3));
      } catch (error) {
        console.error('天気データの取得中にエラーが発生しました:', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Box maxW="lg" borderWidth="1px" borderRadius="lg" overflow="hidden" padding="4">
      <Text fontSize="30px" fontWeight="bold" textAlign="center" mb="0" color="white" bg="#ED64A6">
        週間天気予報
      </Text>

      {weatherData.length > 0 ? (
        <Flex justifyContent="center" gap={4}>
          {weatherData.map((data, index) => (
            <WeatherInfo key={index} weatherData={data} cityName={CITY_NAME} />
          ))}
        </Flex>
      ) : (
        <Text>天気情報を取得中...</Text>
      )}
    </Box>
  );
}