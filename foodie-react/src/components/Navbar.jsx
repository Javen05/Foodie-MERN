import {
  Box,
  Button,
  Flex,
  Link,
  Image,
  DarkMode,
  Heading,
  Tooltip,
  LightMode,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { BsBookmarkStarFill, BsDice1Fill, BsHeartFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { useEffect, useState } from "react";

import ThemeToggle from "./ThemeToggle";
import Login from "./Login";
import FoodieLogo from "../assets/Foodie.png";

import { motion } from "framer-motion";

function NavLink({ children, to, showNav, mobile }) {
  return (
    <DarkMode>
      <Button
        to={to}
        _hover={{ textDecoration: "none" }}
        as={RouterLink}
        w="100%"
        color="white"
        variant={showNav && `/${showNav.page}` === to ? "outline" : "solid"}
        size="md"
        display={mobile ? "flex" : { base: "none", md: "flex" }}
      >
        {children}
      </Button>
    </DarkMode>
  );
}

// animate mobile nav with framer-motion
const navLinksVariants = {
  open: {
    y: 0,
    opacity: 1,
  },
  closed: {
    y: -8,
    opacity: 0,
  },
};

export default function Navbar(page) {
  const [navShown, setNavShown] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setNavShown(false);
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <Flex
      position="sticky"
      top="0"
      w="100%"
      bgColor="brand.300"
      backdropFilter="blur(8px)"
      boxShadow="rgb(0 0 0 / 10%) 0px 1px 3px 0px, rgb(0 0 0 / 6%) 0px 1px 2px 0px"
      p="0.8rem"
      gap="0.5rem"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      zIndex="1000"
    >
      {/* Left */}
      <Link as={RouterLink} to="/" style={{ textDecoration: "none" }}>
        <Flex gap="0.5rem" alignItems="center">
          <Image src={FoodieLogo} alt="" w="calc(2.4rem + 2vmin)" />
          <Heading size="md" color="brand.50" fontSize="calc(1rem + 2vmin)">
            Foodie
          </Heading>
        </Flex>
      </Link>

      {/* Right */}
      <Flex alignItems="center" gap="0.6rem" flexWrap="wrap">
        <LightMode>
          <Tooltip label="Menu:" placement="left">
            <Flex bgColor="brand.300" borderRadius="0.6rem" mr="1.8rem">
              <Tooltip label="Home" placement="bottom">
                <Box>
                  <NavLink to="/" showNav={page}>
                    <AiFillHome
                      fill="var(--chakra-colors-brand-50)"
                      size="24px"
                    />
                  </NavLink>
                </Box>
              </Tooltip>

              <Tooltip label="Favourites" placement="bottom">
                <Box>
                  <NavLink to="/Favourites" showNav={page}>
                    <BsHeartFill
                      fill="var(--chakra-colors-brand-50)"
                      size="20px"
                    />
                  </NavLink>
                </Box>
              </Tooltip>

              <Tooltip label="Bookmarks" placement="bottom">
                <Box>
                  <NavLink to="/Bookmarks" showNav={page}>
                    <BsBookmarkStarFill
                      fill="var(--chakra-colors-brand-50)"
                      size="20px"
                    />
                  </NavLink>
                </Box>
              </Tooltip>

              <Tooltip label="Random Restaurant" placement="bottom">
                <Box>
                  <NavLink to="/Restaurant">
                    <BsDice1Fill
                      fill="var(--chakra-colors-brand-50)"
                      size="20px"
                    />
                  </NavLink>
                </Box>
              </Tooltip>
            </Flex>
          </Tooltip>
        </LightMode>

        <ThemeToggle />

        <DarkMode>
          <Button
            variant="ghost"
            display={{ md: "none" }}
            onClick={() => setNavShown(!navShown)}
          >
            <motion.div
              animate={{ rotate: navShown ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {navShown ? <IoMdClose size="20px" /> : <IoMdMenu size="20px" />}
            </motion.div>
          </Button>
        </DarkMode>

        <Login />
      </Flex>

      {/* Mobile Nav */}
      {navShown && (
        <Flex
          flexDirection="column"
          gap="2"
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          p="4"
          bgColor="brand.200"
          borderColor="brand.300"
          borderWidth="0.3rem"
          borderBottomRadius="1.2rem"
          sx={{
            transform: "translateY(100%)",
            zIndex: 100,
          }}
        >
          <DarkMode>
            <Button
              as={Flex}
              justifyContent="space-between"
              variant="ghost"
              display={{ md: "none" }}
              onClick={() => setNavShown(!navShown)}
            >
              <p></p> <IoMdClose size="25px" />
            </Button>
          </DarkMode>

          <Box h=".8rem"></Box>

          <motion.div
            initial="closed"
            animate={navShown ? "open" : "closed"}
            variants={navLinksVariants}
            transition={{ duration: 0.3 }}
          >
            <NavLink to="/" mobile>
              <Button
                w="100%"
                variant="primary"
                onClick={() => setNavShown(!navShown)}
              >
                Home{" "}
              </Button>
            </NavLink>
            <NavLink to="/Favourites" mobile>
              <Button
                w="100%"
                variant="primary"
                onClick={() => setNavShown(!navShown)}
              >
                Favourites
              </Button>
            </NavLink>
            <NavLink to="/Bookmarks" mobile>
              <Button
                w="100%"
                variant="primary"
                onClick={() => setNavShown(!navShown)}
              >
                Bookmarks{" "}
              </Button>
            </NavLink>
            <NavLink to="/Restaurant" mobile>
              <Button
                w="100%"
                variant="primary"
                onClick={() => setNavShown(!navShown)}
              >
                Random Restaurant{" "}
              </Button>
            </NavLink>
          </motion.div>
        </Flex>
      )}
    </Flex>
  );
}
