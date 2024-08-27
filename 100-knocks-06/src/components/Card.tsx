import React, { forwardRef } from "react";
import { Box, Image, Text, Wrap, WrapItem } from "@chakra-ui/react";

type Props = {
  userInfo: string[];
};

// カードコンポーネントをforwardRefで作成
export const Card = forwardRef<HTMLDivElement, Props>(({ userInfo }, ref) => {
  const [name, birthday, phoneNumber, profileImage] = userInfo;

  return (
    <Wrap>
      <WrapItem>
        <Box
          ref={ref} // カードの参照を設定
          textAlign="center"
          w="300px"
          h="300px"
          bg="white"
          borderRadius="10px"
          shadow="dark-lg"
        >
          <Box>
            <Image
              pt={10}
              textAlign="center"
              borderRadius="9999px"
              boxSize="120px"
              src={profileImage}
              m="auto"
            />
            <Text fontSize="25px">{name}</Text>
            <Text>誕生日: {birthday}</Text>
            <Text>電話番号: {phoneNumber}</Text>
          </Box>
        </Box>
      </WrapItem>
    </Wrap>
  );
});