import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Text, VStack, Textarea, useToast } from "@chakra-ui/react";
import { FaSearch, FaPlus, FaCommentDots } from "react-icons/fa";

const Index = () => {
  const [threads, setThreads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const toast = useToast();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleNewThreadTitleChange = (event) => {
    setNewThreadTitle(event.target.value);
  };

  const handleNewThreadContentChange = (event) => {
    setNewThreadContent(event.target.value);
  };

  const addThread = () => {
    if (!newThreadTitle || !newThreadContent) {
      toast({
        title: "Error",
        description: "Both title and content are required to create a thread.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newThread = {
      id: threads.length + 1,
      title: newThreadTitle,
      content: newThreadContent,
      comments: [],
    };
    setThreads([...threads, newThread]);
    setNewThreadTitle("");
    setNewThreadContent("");
    toast({
      title: "Success",
      description: "New thread created!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container maxW="container.xl">
      <VStack spacing={8} py={10}>
        <Heading>Forum Threads</Heading>
        <Flex>
          <Input placeholder="Search threads..." value={searchTerm} onChange={handleSearchChange} mr={2} />
          <Button leftIcon={<FaSearch />} onClick={() => {}}>
            Search
          </Button>
        </Flex>
        <Box w="full">
          <Heading size="md">Create New Thread</Heading>
          <Stack mt={4}>
            <Input placeholder="Thread Title" value={newThreadTitle} onChange={handleNewThreadTitleChange} />
            <Textarea placeholder="Thread Content" value={newThreadContent} onChange={handleNewThreadContentChange} />
            <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={addThread}>
              Add Thread
            </Button>
          </Stack>
        </Box>
        <Box w="full">
          <Heading size="md">Threads</Heading>
          {filteredThreads.map((thread) => (
            <Box key={thread.id} p={5} shadow="md" borderWidth="1px" my={2}>
              <Heading size="md">{thread.title}</Heading>
              <Text mt={4}>{thread.content}</Text>
              <Button mt={4} leftIcon={<FaCommentDots />} colorScheme="teal" onClick={() => {}}>
                Comment
              </Button>
            </Box>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
