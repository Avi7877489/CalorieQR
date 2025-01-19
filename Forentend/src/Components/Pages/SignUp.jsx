import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Alert } from "@chakra-ui/react";


const SignUp = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", formData);
      localStorage.setItem("token", response.data.token);
      navigate("/main");
    } catch (error) {
      setError("Signup error: Please try again");
      console.error("Signup error:", error);
    }
  };

  return (
    <Box p={8} maxWidth="400px" mx="auto" bg="gray.100" borderRadius="md" boxShadow="md">
      <Heading mb={6}>Sign Up</Heading>
      {error && <Alert status="error" mb={4}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password:</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default SignUp;
