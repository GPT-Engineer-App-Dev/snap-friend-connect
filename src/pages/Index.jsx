import { useState } from "react";
import { VStack, Heading, Text, Image, Container, Flex, IconButton, Box, Input, Button } from "@chakra-ui/react";
import { FaHome, FaUser, FaUpload } from "react-icons/fa";

const photos = [
  { id: 1, src: "https://via.placeholder.com/300", alt: "Photo 1" },
  { id: 2, src: "https://via.placeholder.com/300", alt: "Photo 2" },
  { id: 3, src: "https://via.placeholder.com/300", alt: "Photo 3" },
];

const Index = () => {
  const [activePage, setActivePage] = useState("home");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [likes, setLikes] = useState({});

  const handleLike = (photoId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [photoId]: (prevLikes[photoId] || 0) + 1
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedPhotos(prevPhotos => [...prevPhotos, { id: Date.now(), src: reader.result, alt: file.name }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <VStack spacing={4}>
            {photos.concat(uploadedPhotos).map(photo => (
              <Box key={photo.id} textAlign="center">
                <Image src={photo.src} alt={photo.alt} boxSize="300px" objectFit="cover" />
                <Button onClick={() => handleLike(photo.id)}>Like</Button>
                <Text>{likes[photo.id] || 0} Likes</Text>
              </Box>
            ))}
          </VStack>
        );
      case "profile":
        return (
          <VStack spacing={4}>
            <Heading size="md">Your Profile</Heading>
            <Text>Here you can see your photos and profile information.</Text>
            {uploadedPhotos.map(photo => (
              <Box key={photo.id} textAlign="center">
                <Image src={photo.src} alt={photo.alt} boxSize="300px" objectFit="cover" />
                <Text>{likes[photo.id] || 0} Likes</Text>
              </Box>
            ))}
          </VStack>
        );
      case "upload":
        return (
          <VStack spacing={4}>
            <Heading size="md">Upload Photo</Heading>
            <Input type="file" accept="image/*" onChange={handlePhotoUpload} />
            <Button onClick={() => setActivePage("home")}>Go to Home</Button>
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