import React, { useState, useRef } from "react";
import { Box, Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { Card } from "./Card";
import html2canvas from "html2canvas";

export const MainProfileDsp = () => {
  // 各入力フィールドの状態を管理
  const [name, setName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [submittedInfo, setSubmittedInfo] = useState<string[]>([]);

  // カードコンポーネントを参照するためのref
  const cardRef = useRef<HTMLDivElement>(null);

  // 画像ファイルが選択されたときの処理
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const fileObject = e.target.files[0];
    setProfileImage(window.URL.createObjectURL(fileObject));
  };

  // 登録ボタンが押されたときの処理
  const handleSubmit = () => {
    setSubmittedInfo([name, birthday, phoneNumber, profileImage]);
    setName("");
    setBirthday("");
    setPhoneNumber("");
  };

  // ダウンロードボタンが押されたときの処理
  const handleDownload = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current);
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "profile-card.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center" mr={150}>
      <HStack spacing="24px" align="start">
        {/* カードコンポーネント */}
        <Card userInfo={submittedInfo} ref={cardRef} />
        <VStack spacing="1px" align="start">
          {/* 各入力フィールド */}
          <Text mb={1}>名前</Text>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Text mb={1}>誕生日</Text>
          <Input
            name="birthday"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <Text mb={1}>電話番号</Text>
          <Input
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input type="file" accept="image/*" m={15} onChange={onFileInputChange} />
          <Button w="150px" onClick={handleSubmit}>
            登録
          </Button>
          <Button w="150px" onClick={handleDownload}>
            ダウンロード
          </Button>
        </VStack>
      </HStack>
    </Flex>
  );
};