import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react";

const HomePage = () => {
  const categories = ["Burgers", "Pizza", "Sushi"];
  const featuredDishes = ["Pasta", "Tacos", "Desserts"];

  return (
    <Box>
      <Container maxW="container.xl">
        {/* Hero Section */}
        <Box
          textAlign="center"
          py={12}
          bgGradient="linear(to-r, teal.500, blue.500)"
          color="white"
        >
          <Heading as="h1" size="2xl">
            Welcome to Foodies
          </Heading>
          <Text mt={4} fontSize="lg">
            Discover the best dishes from top-rated restaurants.
          </Text>
        </Box>

        {/* Featured Categories Section */}
        <Box py={12}>
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Categories
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {categories.map((category) => (
              <GridItem
                key={category}
                bg="gray.100"
                p={6}
                borderRadius="md"
                boxShadow="md"
                _hover={{ transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
              >
                <Image
                  src={`https://source.unsplash.com/300x200/?${category}`}
                  alt={`${category} category`}
                  borderRadius="md"
                  mb={4}
                />
                <Heading as="h3" size="md">
                  {category}
                </Heading>
                <Text mt={2}>
                  Delicious {category.toLowerCase()} delivered to you.
                </Text>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>

        {/* Featured Dishes Section */}
        <Box py={12}>
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Featured Dishes
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            {featuredDishes.map((dish) => (
              <GridItem
                key={dish}
                bg="white"
                p={6}
                borderRadius="md"
                boxShadow="md"
                _hover={{ transform: "scale(1.05)", transition: "0.2s ease-in-out" }}
              >
                <Image
                  src={`https://source.unsplash.com/300x200/?${dish}`}
                  alt={`Featured dish: ${dish}`}
                  borderRadius="md"
                  mb={4}
                />
                <Heading as="h3" size="md">
                  {dish}
                </Heading>
                <Text mt={2}>A perfect choice for your taste buds.</Text>
                <Button
                  mt={4}
                  colorScheme="teal"
                  aria-label={`Order ${dish}`}
                  _hover={{ bg: "teal.600" }}
                >
                  Order Now
                </Button>
              </GridItem>
            ))}
          </SimpleGrid>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        bgGradient="linear(to-r, teal.500, blue.500)"
        color="white"
        py={8}
        textAlign="center"
      >
        <Text>© {new Date().getFullYear()} Foodies. All rights reserved.</Text>
      </Box>
    </Box>
  );
};

export default HomePage;
