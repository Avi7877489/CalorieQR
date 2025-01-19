import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Divider,
  useColorModeValue,
  IconButton,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  // Theme-aware styles
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, blue.500)",
    "linear(to-r, gray.700, gray.900)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const hoverColor = useColorModeValue("blue.200", "teal.300");
  const dividerColor = useColorModeValue("blue.300", "gray.600");

  return (
    <Box as="footer" bgGradient={bgGradient} color={textColor} py={8}>
      <Container maxW="container.xl">
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="flex-start"
          spacing={8}
        >
          {/* Quick Links */}
          <Stack>
            <Text fontSize="lg" fontWeight="bold">
              Quick Links
            </Text>
            {["About Us", "Privacy Policy", "Terms & Conditions"].map(
              (link, index) => (
                <Link
                  key={index}
                  as={RouterLink}
                  to={`/${link.replace(/\s+/g, "-").toLowerCase()}`}
                  fontSize="md"
                  _hover={{
                    textDecoration: "underline",
                    color: hoverColor,
                  }}
                >
                  {link}
                </Link>
              )
            )}
          </Stack>

          {/* Social Media Links */}
          <Stack spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              Follow Us
            </Text>
            <Stack direction="row" spacing={4}>
              <IconButton
                as="a"
                href="https://facebook.com"
                target="_blank"
                aria-label="Facebook"
                icon={<FaFacebook />}
                bg="transparent"
                color={textColor}
                _hover={{ color: hoverColor }}
              />
              <IconButton
                as="a"
                href="https://instagram.com"
                target="_blank"
                aria-label="Instagram"
                icon={<FaInstagram />}
                bg="transparent"
                color={textColor}
                _hover={{ color: hoverColor }}
              />
              <IconButton
                as="a"
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                bg="transparent"
                color={textColor}
                _hover={{ color: hoverColor }}
              />
            </Stack>
          </Stack>

          {/* Contact Info */}
          <Stack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              Contact Us
            </Text>
            <Text fontSize="sm">
              Address: 123 Healthy Lane, Wellness City, Fitland
            </Text>
            <Text fontSize="sm">Email: support@mycoolapp.com</Text>
            <Text fontSize="sm">Phone: +1-800-555-1234</Text>
          </Stack>
        </Stack>

        <Divider my={6} borderColor={dividerColor} />

        {/* Bottom Footer */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
        >
          <Text fontSize="sm">
            © {new Date().getFullYear()} My Cool App. All rights reserved.
          </Text>
          <Text fontSize="sm" textAlign="center">
            Built with Team Alpha
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
