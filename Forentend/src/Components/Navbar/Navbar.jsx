import {
  Flex,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  HStack,
  Link,
  Box,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ onOpen }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  // Theme-aware colors
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.400, blue.500)",
    "linear(to-r, gray.700, gray.900)"
  );
  const color = useColorModeValue("white", "gray.200");

  return (
    <Flex
      as="nav"
      bgGradient={bgGradient}
      boxShadow="lg"
      color={color}
      p={4}
      justify="space-between"
      align="center"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Logo Section */}
      <Text fontSize="2xl" fontWeight="bold">
        <RouterLink to="/">My Cool App</RouterLink>
      </Text>

      {/* Navigation Links */}
      <HStack
        spacing={4}
        display={{ base: "none", md: "flex" }}
        fontWeight="medium"
        fontSize="lg"
      >
        <Link as={RouterLink} to="/" _hover={{ color: "blue.200" }}>
          Home
        </Link>
        <Link as={RouterLink} to="/about" _hover={{ color: "blue.200" }}>
          About
        </Link>
        <Link as={RouterLink} to="/services" _hover={{ color: "blue.200" }}>
          Services
        </Link>
        <Link as={RouterLink} to="/contact" _hover={{ color: "blue.200" }}>
          Contact
        </Link>
      </HStack>

      {/* Mobile Menu and Theme Toggle */}
      <Flex align="center" gap={2}>
        <IconButton
          aria-label="Toggle Theme"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          colorScheme="whiteAlpha"
          _hover={{ bg: "teal.600" }}
          onClick={toggleColorMode}
        />
        <Box display={{ base: "flex", md: "none" }}>
          <IconButton
            aria-label="Open Menu"
            icon={<HamburgerIcon />}
            variant="ghost"
            colorScheme="whiteAlpha"
            _hover={{ bg: "teal.600" }}
            onClick={onOpen}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;
