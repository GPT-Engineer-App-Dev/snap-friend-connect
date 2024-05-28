import { Box, Container, Flex, Heading, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { FaHome, FaUser, FaUpload } from "react-icons/fa";
import { useState } from "react";

const photos = [
  { id: 1, src: "https://via.placeholder.com/300", alt: "Photo 1" },
  { id: 2, src: "https://via.placeholder.com/300", alt: "Photo 2" },
  { id: 3, src: "https://via.placeholder.com/300", alt: "Photo 3" },
];

const Index = () => {
  const [activePage, setActivePage] = useState("home");

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <VStack spacing={4}>
            {photos.map(photo => (
              <Image key={photo.id} src={photo.src} alt={photo.alt} boxSize="300px" objectFit="cover" />
            ))}
          </VStack>
        );
      case "profile":
        return (
          <VStack spacing={4}>
            <Heading size="md">Your Profile</Heading>
            <Text>Here you can see your photos and profile information.</Text>
          </VStack>
        );
      case "upload":
        return (
          <VStack spacing={4}>
            <Heading size="md">Upload Photo</Heading>
            <Text>Feature to upload photos will be implemented here.</Text>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="space-between" mb={4}>
        <IconButton aria-label="Home" icon={<FaHome />} onClick={() => setActivePage("home")} />
        <IconButton aria-label="Profile" icon={<FaUser />} onClick={() => setActivePage("profile")} />
        <IconButton aria-label="Upload" icon={<FaUpload />} onClick={() => setActivePage("upload")} />
      </Flex>
      <Box>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default Index;