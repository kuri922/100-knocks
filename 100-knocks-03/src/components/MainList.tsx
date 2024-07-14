
import { Box, Flex, Heading, VStack, Input, Button, Text } from "@chakra-ui/react";
import { useState } from "react";


export const MainList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<string[]>([]);

  //TODOの内容を追加する関数
  const AddTodo = () => {
    if (todo) {
      setTodos([...todos, todo]);
      setTodo("")
    }
  }

  //TODOを削除する関数
  //選択された要素のインデックスを受け取り、インデックスを持つ要素のみの
  //配列を作り直す。
  const DeleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  }
  return (
    <Flex
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="#E5E2E4"
    >
      <Box
        w="300px"
        h="500px"
        bg="white"
        borderRadius="md"
        boxShadow="md"
        p={0}
        position="relative"
      >
        <Box
          bg="#8CD2BC"
          borderTopRadius="md"
          py={2}
          px={4}
        >
          <Heading
            size="md"
            color="white"
            textAlign="center">
            TODOリスト
          </Heading>
        </Box>
        <VStack spacing={4} align="stretch">
          {todos.map((item, index) => (
            <Flex
              justifyContent="space-between" alignItems="center" w="100%"
              key={index}>
              <Text >{item}</Text>
              <Button
                backgroundColor="#E5E2E4"
                fontSize="20px"
                w="50px"
                h="25px"
                aria-label={"Delete"}
                onClick={() => DeleteTodo(index)}>

                削除
              </Button>
            </Flex>
          ))}

        </VStack>
        <Flex
          position="absolute"
          bottom={4}
          right={4}
          justifyContent="flex-end"
        >
        </Flex>
        <Flex
          position="absolute"
          bottom={5}
          left={5}
          bg="white"
          borderBottomRadius="md"
          boxShadow="0 -1px 2px rgba(0, 0, 0, 0.1)"
        >
          <Input
            w="200px"
            mr={10}
            placeholder='追加する内容を入力'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            w="70px"
            onClick={AddTodo}
            disabled={!todo}
          >登録</Button>
        </Flex>
      </Box>
    </Flex >
  );
};
