import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  Image,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const Services = () => {
  const [qrCode, setQrCode] = useState("");
  const [calorieCount, setCalorieCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const handleScan = async () => {
    if (!qrCode) {
      setError("Please enter a valid QR code.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous error messages
    setCalorieCount(null); // Reset previous result

    try {
      // Simulate fetching calorie count from an API
      const response = await fetch(`/api/qr/scandish/${qrCode}`);
      if (!response.ok) {
        throw new Error("Failed to fetch calorie count. Please try again.");
      }
      const data = await response.json();
      setCalorieCount(data.calories); // Assume API returns calorie count

      // Display success toast
      toast({
        title: "Success!",
        description: "Calorie count retrieved successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");

      // Display error toast
      toast({
        title: "Error!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      {/* Page Header */}
      <Heading as="h1" size="xl" mb={6} textAlign="center">
        Scan QR Code for Calorie Count
      </Heading>

      {/* QR Scanner Image */}
      <Box textAlign="center" mb={6}>
        <Image
          src="/images/qr-scanner.jpg" // Replace with your image path
          alt="QR Scanner"
          borderRadius="md"
          boxSize="300px"
          mx="auto"
          mb={4}
        />
        <Text fontSize="md" color="gray.600">
          Enter the QR code of your food dish to get its calorie count.
        </Text>
      </Box>

      {/* QR Code Input and Scan Button */}
      <Stack spacing={4} direction="column" align="center">
        <Input
          placeholder="Enter QR Code"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          width="100%"
          maxW="400px"
          aria-label="QR Code Input"
        />
        <Button
          colorScheme="teal"
          onClick={handleScan}
          isDisabled={loading || !qrCode}
          aria-label="Scan QR Code Button"
        >
          {loading ? <Spinner size="sm" /> : "Scan"}
        </Button>
      </Stack>

      {/* Result Section */}
      {calorieCount !== null && !loading && (
        <Box mt={6} textAlign="center">
          <Text fontSize="lg" fontWeight="bold">
            Calorie Count:
          </Text>
          <Text fontSize="xl" color="blue.500">
            {calorieCount} kcal
          </Text>
        </Box>
      )}

      {/* Error Handling */}
      {error && (
        <Alert status="error" mt={6}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default Services;
