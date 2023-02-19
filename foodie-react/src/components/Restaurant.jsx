import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Icon,
  Image,
  SlideFade,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  BsBookmarkFill,
  BsFillInfoSquareFill,
  BsFillShareFill,
  BsHeartFill,
} from "react-icons/bs";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { useEffect } from "react";
import Rating from "./Rating";
import placeholder from "../assets/images/placeholder.png";
import { useAuth } from "../context/AuthContext";

export default function RestaurantCard({ restaurant }) {
  const { idRestaurant, name, description, ratio, reviewers } = restaurant;
  const [token, setToken] = useState("");
  const [alert, setAlert] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setToken(localStorage.getItem("Session Token DO-NOT-SHARE"));
  }, [user]);

  const addToList = (type) => {
    if (!token) {
      const alert = document.querySelector(".loginAlert");
      alert.hidden = false;

      setTimeout(() => {
        alert.hidden = true;
      }, 2000);

      return;
    }

    fetch("/api/list/" + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        idRestaurant: idRestaurant,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.code === "ER_DUP_ENTRY") {
          fetch("/api/list/" + type, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              idRestaurant: idRestaurant,
            }),
          })
            .then((response) => response.json())
            .then((result) => {
              setAlert(result.message);

              setTimeout(() => {
                setAlert("");
              }, 1500);
            });
        } else {
          setAlert(result.message);
          setTimeout(() => {
            setAlert("");
          }, 1500);
        }
      });
  };

  useEffect(() => {
    if (token) {
      fetch("/api/list/favourites", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setIsFavourite(false);
          result = result.filter(
            (restaurant) => restaurant.idRestaurant === idRestaurant
          );

          result.map((restaurant) => {
            if (restaurant.idRestaurant === idRestaurant) {
              setIsFavourite(true);
            }
          });
        });

      fetch("/api/list/bookmarks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setIsBookmark(false);
          result = result.filter(
            (restaurant) => restaurant.idRestaurant === idRestaurant
          );

          result.map((restaurant) => {
            if (restaurant.idRestaurant === idRestaurant) {
              setIsBookmark(true);
            }
          });
        });
    }
  }, [user, addToList]);

  return (
    <SlideFade in={true} offsetY="20px">
      <AnimateSharedLayout>
        <AnimatePresence>
          <Box
            borderRadius="1.2rem"
            boxShadow={useColorModeValue(
              "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
              "0 0 1rem 0 rgba(0, 0, 0, 1)"
            )}
            padding="1.2rem"
            pt="0"
            _hover={{
              boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.15)",
            }}
          >
            <Rating rating={ratio} />
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ opacity: 0.6 }}
            >
              <RouterLink to={"/Restaurant/" + idRestaurant}>
                <Image // split images to take only the first image if the restaurant has multiple banners.
                  src={
                    "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/banners/" +
                    restaurant.images.split(",")[0] +
                    ".jpg"
                  }
                  fallbackSrc={placeholder}
                  alt={name}
                  width="100%"
                  height="12rem"
                  objectFit="cover"
                  borderRadius="0.8rem"
                  marginBottom="0.8rem"
                  _hover={{
                    opacity: "0.9",
                    boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                  }}
                />
              </RouterLink>
            </motion.div>
            <Heading
              fontSize="1.6rem"
              mb="0.8rem"
              maxW="13rem"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              title={name}
            >
              {name}
            </Heading>
            <Flex justifyContent="space-between">
              <Tooltip
                label="Favourite"
                aria-label="Favourite"
                placement="bottom"
                arrowSize={10}
                hasArrow={true}
                bg={useColorModeValue("brand.300", "brand.100")}
                mt="1.2rem"
              >
                <Button
                  className="favouriteButton"
                  variant="primary"
                  colorScheme="brand"
                  color={isFavourite === true ? "brand.200" : "brand"}
                  _active={{
                    color: "brand.100",
                  }}
                  size="sm"
                  onClick={() => addToList("favourites")}
                >
                  <Icon as={BsHeartFill} boxSize="22px" />
                </Button>
              </Tooltip>
              <Tooltip
                label="Bookmark"
                aria-label="Bookmark"
                placement="bottom"
                arrowSize={10}
                hasArrow={true}
                bg={useColorModeValue("brand.300", "brand.100")}
                mt="1.2rem"
              >
                <Button
                  variant="primary"
                  colorScheme="brand"
                  color={isBookmark === true ? "brand.200" : "brand"}
                  _active={{
                    color: "brand.100",
                  }}
                  size="sm"
                  onClick={() => addToList("bookmarks")}
                >
                  <Icon as={BsBookmarkFill} boxSize="22px" />
                </Button>
              </Tooltip>
              <Popover
                isLazy={true}
                placement="bottom"
                closeOnBlur={true}
                closeOnEsc={true}
                returnFocusOnClose={true}
                usePortal={true}
              >
                <PopoverTrigger>
                  <Box>
                    <Tooltip
                      label="More info"
                      aria-label="More info"
                      placement="bottom"
                      arrowSize={10}
                      hasArrow={true}
                      bg={useColorModeValue("brand.300", "brand.100")}
                      mt="1.2rem"
                    >
                      <Button
                        variant="primary"
                        colorScheme="brand"
                        size="sm"
                        _hover={{
                          color: "brand.200",
                        }}
                      >
                        <Icon as={BsFillInfoSquareFill} boxSize="22px" />
                      </Button>
                    </Tooltip>
                  </Box>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader fontWeight="bold" border="0">
                    {name}
                  </PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>{description}</PopoverBody>
                  <PopoverFooter>{reviewers} Reviewed</PopoverFooter>
                </PopoverContent>
              </Popover>
              <Tooltip
                label="Share"
                aria-label="Share"
                placement="bottom"
                arrowSize={10}
                hasArrow={true}
                bg={useColorModeValue("brand.300", "brand.100")}
                mt="1.2rem"
              >
                <Button
                  variant="primary"
                  colorScheme="brand"
                  size="sm"
                  _focus={{
                    color: "brand.200",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      window.location.href + `Restaurant/${idRestaurant}`
                    );
                    const alert = document.querySelector(".shareAlert");
                    alert.hidden = false;
                    setTimeout(() => {
                      alert.hidden = true;
                    }, 2000);
                  }}
                >
                  <Icon as={BsFillShareFill} boxSize="22px" />
                </Button>
              </Tooltip>
            </Flex>
          </Box>
          <Alert
            status="success"
            variant="solid"
            pos="fixed"
            hidden={true}
            className="shareAlert"
            closeOnBlur={true}
            right="0"
            bottom=".8rem"
            left="0"
            zIndex="1000"
            w="max-content"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mx="auto"
            borderRadius="0.8rem"
          >
            <AlertIcon />
            <AlertTitle>Copied to clipboard!</AlertTitle>
          </Alert>
          <Alert
            status="info"
            variant="solid"
            pos="fixed"
            hidden={true}
            className="loginAlert"
            closeOnBlur={true}
            right="0"
            bottom=".8rem"
            left="0"
            zIndex="1000"
            w="max-content"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mx="auto"
            borderRadius="0.8rem"
          >
            <AlertIcon />
            <AlertTitle>This feature requires an Account.</AlertTitle>
          </Alert>
          <Alert
            status="success"
            variant="solid"
            pos="fixed"
            hidden={alert ? false : true}
            className="added"
            closeOnBlur={true}
            right="0"
            bottom=".8rem"
            left="0"
            zIndex="1000"
            w="max-content"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            mx="auto"
            borderRadius="0.8rem"
          >
            <AlertIcon />
            <AlertTitle>{alert}</AlertTitle>
            <CloseButton onClick={() => setAlert("")} />
          </Alert>
        </AnimatePresence>
      </AnimateSharedLayout>
    </SlideFade>
  );
}
