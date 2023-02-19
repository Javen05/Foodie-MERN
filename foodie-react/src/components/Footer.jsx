import {
  Box,
  Button,
  Flex,
  Link,
  Image,
  DarkMode,
  Heading,
  GridItem,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
import {
  FaTwitterSquare,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaGithubSquare,
} from "react-icons/fa";

import FoodieLogo from "../assets/Foodie.png";

const FooterSection = ({ children, to }) => {
  return <GridItem p="0.8rem">{children}</GridItem>;
};

export default function Footer() {
  return (
    <DarkMode>
      <Flex
        color="white"
        flexWrap="wrap"
        flexDirection="row"
        justifyContent="space-around"
        bgColor="brand.200"
      >
        <FooterSection>
          <Flex flexDir="column" alignItems="center" gap="0.2rem">
            <Flex gap="0.5rem" alignItems="center">
              <Image src={FoodieLogo} alt="" w="calc(1.2rem + 2vmin)" />
              <Heading size="md" color="brand.50" fontSize="calc(1rem + 1vmin)">
                Foodie
              </Heading>
            </Flex>
            <h3>Food Review Site</h3>

            <Box>
              <Box>
                <br /> Foodie is an Unofficial Food Review Site that
                <br /> allow Users to review and rate Restaurants
                <br /> to share their experiences truthfully.
              </Box>
              <br /> Made with MERN Stack + Vite and ChakraUI,
              <br /> by Javen Lai
            </Box>
          </Flex>
        </FooterSection>

        <FooterSection>
          <Flex alignItems="center" flexDir="column" gap="0.8rem">
            <Heading color="brand.50" textDecor="underline" fontSize="1rem">
              Legal
            </Heading>

            <Link as={RouterLink} to="/Cookie-Policy">
              <Flex gap="0.6rem" alignItems="center">
                <h3>Cookie Policy</h3>
              </Flex>
            </Link>

            <Link as={RouterLink} to="/TOS">
              <Flex gap="0.6rem" alignItems="center">
                <h3>Terms Of Service</h3>
              </Flex>
            </Link>

            <Link as={RouterLink} to="/Privacy-Policy">
              <Flex gap="0.6rem" alignItems="center">
                <h3>Privacy Policy</h3>
              </Flex>
            </Link>

            <br />
            <br />

            <h3>Foodie &copy; 2022</h3>
          </Flex>
        </FooterSection>

        <FooterSection>
          <Flex flexDir="column" alignItems="center">
            <Heading
              color="brand.50"
              textDecor="underline"
              marginBottom="0.6rem"
              fontSize="1rem"
            >
              Socials
            </Heading>

            <Box as={Flex} flexDir="column-reverse">
              <Button
                as={Link}
                variant="ghost"
                gap="0.4rem"
                display="flex"
                flexDir="row"
                href="https://twitter.com"
                isExternal
                justifyContent="left"
              >
                <FaTwitterSquare size="2rem" /> Twitter
              </Button>
              <Button
                as={Link}
                variant="ghost"
                gap="0.4rem"
                display="flex"
                flexDir="row"
                href="https://github.com/Javen05"
                isExternal
                justifyContent="left"
              >
                <FaGithubSquare size="2rem" /> GitHub
              </Button>
              <Button
                as={Link}
                variant="ghost"
                gap="0.4rem"
                display="flex"
                flexDir="row"
                href="https://www.linkedin.com/in/javen-lai-5bba90239/"
                isExternal
                justifyContent="left"
              >
                <FaLinkedin size="2rem" /> LinkedIn
              </Button>
              <Button
                as={Link}
                variant="ghost"
                gap="0.4rem"
                display="flex"
                flexDir="row"
                href="https://www.facebook.com"
                isExternal
                justifyContent="left"
              >
                <FaFacebookSquare size="2rem" /> Facebook
              </Button>
              <Button
                as={Link}
                variant="ghost"
                gap="0.4rem"
                display="flex"
                flexDir="row"
                href="https://www.instagram.com"
                isExternal
              >
                <FaInstagramSquare size="2rem" /> Instagram
              </Button>
            </Box>
          </Flex>
        </FooterSection>
      </Flex>
    </DarkMode>
  );
}
