import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  IoBookmarkOutline,
  IoEllipsisHorizontalCircleSharp,
  IoHeartOutline,
  IoOpenOutline,
  IoTrash,
} from "react-icons/io5";
import placeholder from "../assets/images/placeholder.png";
import ReviewPrompt from "./ReviewOrEdit";

export default function RestaurantCard({ restaurant, t }) {
  const { idRestaurant, name } = restaurant;

  const [alert, setAlert] = useState("");
  const [reviewPrompt, setReviewPrompt] = useState("");
  const [remove, setRemove] = useState("Remove");
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleRemove() {
    setIsModalOpen(false);
    removeRestaurant(true);
  }

  const removeRestaurant = (fromMenu) => {
    let type = t === "B" ? "Bookmarks" : "Favourites";
    if (t === "B" && !fromMenu) {
      setReviewPrompt(idRestaurant);
      return;
    } else if (remove === "Undo") {
      addList(true);
      setRemove("Remove");
    } else {
      fetch(`/api/list/${type}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
        body: JSON.stringify({
          idRestaurant: idRestaurant,
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          remove === "Remove" ? setRemove("Undo") : <></>;
          setAlert(result.message);

          setTimeout(() => {
            setAlert("");
            {
              t === "B" ? window.location.reload() : <></>;
            }
          }, 1000);
        });
    }
  };

  const addList = async (fromButton) => {
    let type;
    fromButton
      ? (type = t === "B" ? "Bookmarks" : "Favourites")
      : (type = t === "B" ? "Favourites" : "Bookmarks");
    const response = await fetch(`/api/list/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        idRestaurant: idRestaurant,
      }),
    });

    const result = await response.json();

    result.message ? setAlert(result.message) : setAlert(`Already in ${type}`);

    setTimeout(() => {
      setAlert("");
    }, 1000);
  };

  const viewRestaurant = () => {
    let type = t === "B" ? "Bookmarks" : "Favourites";
    window.open(
      window.location.href.replace(`/${type}`, "") +
        `/Restaurant/${idRestaurant}`
    );
  };

  // convert 24-hour time to 12-hour time
  let hours = parseInt(restaurant.date.slice(11, 13));
  let minutes = restaurant.date.slice(14, 16);
  let ampm;

  hours >= 12 ? ((ampm = "PM"), (hours = hours % 12 || 12)) : (ampm = "AM");

  const timeFormat = hours + ":" + minutes + " " + ampm;

  return (
    <SlideFade in={true} offsetY="20px">
      <Box
        borderRadius="1.2rem"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 1)"
        )}
        padding="1.2rem"
        pt="0.6rem"
        _hover={{
          boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.15)",
        }}
      >
        <Heading
          fontSize="1.6rem"
          mb="0.4rem"
          maxW="13rem"
          overflow="hidden"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          title={name}
        >
          {name}
        </Heading>

        <Image
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
          marginBottom="0.6rem"
          _hover={{
            opacity: "0.9",
            boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = `/Restaurant/${idRestaurant}`)}
        />

        <Flex justifyContent="space-between" alignItems="center" mb="0.6rem">
          <Flex>
            Added on:
            <br />
            {restaurant.date.slice(0, 10)} at {timeFormat}
          </Flex>

          <Menu>
            <Tooltip
              label={t === "F" ? "Visit" : "Options"}
              aria-label="More options"
              placement="top"
              arrowSize={10}
              hasArrow={true}
              bg={useColorModeValue("brand.300", "brand.100")}
            >
              <MenuButton
                as={IconButton}
                aria-label="Options"
                variant="ghost"
                icon={
                  <Icon boxSize="2.6rem" as={IoEllipsisHorizontalCircleSharp} />
                }
                _hover={{
                  color: useColorModeValue("brand.300", "brand.100"),
                }}
                _active={{
                  color: "brand.200",
                }}
              />
            </Tooltip>
            <MenuList pos="fixed" right="-2.6rem">
              <MenuItem
                justifyContent="space-between"
                onClick={() => {
                  viewRestaurant();
                }}
              >
                Visit
                <Icon as={IoOpenOutline} boxSize="1.2rem" />
              </MenuItem>
              <MenuItem
                justifyContent="space-between"
                onClick={() => {
                  addList();
                }}
              >
                Add to {t === "F" ? "Bookmarks" : "Favourites"}
                <Icon
                  as={t === "F" ? IoBookmarkOutline : IoHeartOutline}
                  boxSize="1.2rem"
                />
              </MenuItem>
              <MenuItem
                color="red.600"
                as="b"
                onClick={() => {
                  setIsModalOpen(true);
                }}
                justifyContent="space-between"
                display={t === "F" ? "none" : "Flex"}
              >
                Remove
                <Icon as={IoTrash} boxSize="1.2rem" />
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Button
          w="100%"
          colorScheme={t === "F" && remove === "Remove" ? "pink" : "teal"}
          onClick={() => removeRestaurant()}
        >
          {t === "F" ? remove : "Complete"}
        </Button>
      </Box>

      <Alert
        status="info"
        variant="solid"
        pos="fixed"
        hidden={alert === "" ? true : false}
        right="0"
        bottom=".8rem"
        left="0"
        zIndex="1000"
        w="max-content"
        closeOnBlur={true}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        mx="auto"
        borderRadius="0.8rem"
      >
        <AlertIcon />
        <AlertTitle>{alert}</AlertTitle>
      </Alert>

      <Modal
        isCentered={true}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation:</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to remove <b>{name}</b>?
            <Alert status="warning" variant="subtle" mt="1rem" as="i">
              Removing Restaurants using the "Complete" button is the intended
              way to remove Restaurants from Bookmarks, as we are curious about
              your experience with the Restaurant.
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
              mr={3}
            >
              Cancel
            </Button>
            <Button colorScheme="green" onClick={handleRemove}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ReviewPrompt
        isOpen={reviewPrompt}
        onClose={() => setReviewPrompt("")}
        restaurant={name}
      />
    </SlideFade>
  );
}
