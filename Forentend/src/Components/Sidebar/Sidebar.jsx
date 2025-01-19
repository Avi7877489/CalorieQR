import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Navigation items
  const navItems = ["Home", "About", "Services", "Contact"];
  const isAuthenticated = localStorage.getItem("token") !== null;

  const handleNavigation = (path) => {
    if (path === "Dashboard" || path === "Logout") {
      if (!isAuthenticated) {
        navigate("/login");
        return;
      }
    }
    navigate(`/${path.toLowerCase()}`);
  };

  // Theme-aware styles
  const bgGradient = useColorModeValue(
    "linear(to-r, teal.500, blue.600)",
    "linear(to-r, gray.700, gray.900)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const hoverBg = useColorModeValue("teal.700", "gray.600");
  const closeButtonHover = useColorModeValue("blue.700", "gray.800");
  const activeLinkBg = useColorModeValue("blue.700", "teal.900");

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bgGradient={bgGradient} color={textColor}>
        <DrawerCloseButton _hover={{ bg: closeButtonHover }} />
        <DrawerHeader fontSize="2xl" fontWeight="bold">
          Menu
        </DrawerHeader>
        <DrawerBody>
          <VStack spacing={4} align="start">
            {navItems.map((item) => (
              <Link
                key={item}
                onClick={() => handleNavigation(item)}
                p={2}
                borderRadius="md"
                fontSize="lg"
                fontWeight="medium"
                _hover={{ bg: hoverBg, transform: "scale(1.05)" }}
                _active={{ bg: activeLinkBg }}
                transition="all 0.2s"
                aria-label={`Go to ${item}`}
              >
                {item}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link
                  p={2}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="medium"
                  _hover={{ bg: hoverBg, transform: "scale(1.05)" }}
                  onClick={() => handleNavigation("Dashboard")}
                >
                  Dashboard
                </Link>
                <Link
                  p={2}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="medium"
                  _hover={{ bg: hoverBg, transform: "scale(1.05)" }}
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/login");
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  p={2}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="medium"
                  _hover={{ bg: hoverBg, transform: "scale(1.05)" }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
                <Link
                  p={2}
                  borderRadius="md"
                  fontSize="lg"
                  fontWeight="medium"
                  _hover={{ bg: hoverBg, transform: "scale(1.05)" }}
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Link>
              </>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
