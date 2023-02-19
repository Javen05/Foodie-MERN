import {
  CloseButton,
  Flex,
  Heading,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function PolicyTab() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Flex
        direction="column"
        position="fixed"
        right="0"
        margin="0.8rem"
        p="1.1rem"
        w="40vmin"
        marginTop="6rem"
        bgColor={useColorModeValue("brand.100", "brand.300")}
        borderRadius="0.8rem"
        boxShadow="md"
        minWidth="160px"
        display={isVisible ? "none" : "flex"}
      >
        <Heading size="md">Our Other Policies:</Heading>

        <CloseButton
          onClick={() => setIsVisible(!isVisible)}
          position="absolute"
          top="0.5rem"
          right="0.5rem"
        />

        <br />

        <Link as={RouterLink} to="/Cookie-Policy">
          <Flex gap="0.5rem" alignItems="center">
            <h3>Cookie Policy</h3>
          </Flex>
        </Link>

        <Link as={RouterLink} to="/TOS">
          <Flex gap="0.5rem" alignItems="center">
            <h3>Terms Of Service</h3>
          </Flex>
        </Link>

        <Link as={RouterLink} to="/Privacy-Policy">
          <Flex gap="0.5rem" alignItems="center">
            <h3>Privacy Policy</h3>
          </Flex>
        </Link>
      </Flex>
    </>
  );
}
