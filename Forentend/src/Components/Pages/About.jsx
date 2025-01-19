import { Box, Container, Heading, Text, Image, Stack, Divider } from "@chakra-ui/react";

const About = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        About Us
      </Heading>
      
      <Box textAlign="center" mb={6}>
        <Image
          src="/images/about-hero.jpg" // Replace with your image path
          alt="About Hero Image"
          borderRadius="md"
          mb={4}
        />
        <Text fontSize="md" color="gray.600">
          Welcome to our food website! We are dedicated to delivering the finest culinary experiences through our expert chefs (doctors). From appetizers to desserts, we offer a variety of flavors that tantalize your taste buds.
        </Text>
      </Box>
      
      <Divider my={6} borderColor="blue.300" />
      
      <Stack spacing={6} direction={{ base: "column", md: "row" }} align="center">
        <Box flex="1" textAlign="center">
          <Image
            src="/images/chef1.jpg" // Replace with your image path
            alt="Dr. Image"
            borderRadius="md"
            mb={4}
            boxSize="200px"
          />
          <Text fontSize="lg" fontWeight="bold">
            Our Head Dr.
          </Text>
          <Text color="gray.500">Dr. John Doe - Specializing in French Cuisine</Text>
        </Box>
        
        <Box flex="1" textAlign="center">
          <Image
            src="/images/chef2.jpg" // Replace with your image path
            alt="Chef Image"
            borderRadius="md"
            mb={4}
            boxSize="200px"
          />
          <Text fontSize="lg" fontWeight="bold">
          Our Head Chef
          </Text>
          <Text color="gray.500">Dr. Jane Smith - Expert in Italian Dishes</Text>
        </Box>
      </Stack>
    </Container>
  );
};

export default About;
