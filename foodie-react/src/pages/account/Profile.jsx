import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import noProfile from "../../assets/images/defUser.png";
import { AiFillDislike, AiFillLike, AiFillStar } from "react-icons/ai";
import { MdEdit } from "react-icons/md";

export default function Profile() {
  const { user } = useAuth();
  const [ratio, setRatio] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/upvote/me/${user.username}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setRatio(data[0]);
        });
    }
  }, [user]);

  useEffect(() => {
    fetch("/api/restaurant/edit", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRestaurants(data);
      });
  }, [user]);

  return (
    <Grid p="0.8rem">
      <Flex
        flexDir="row"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 0.8)"
        )}
        gap="2rem"
        alignItems="center"
        m="2%"
        p="1.4rem"
        fontSize="1.2rem"
        borderRadius="1.2rem"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Flex flexDir="column" alignItems="center" gap="1.2rem">
          <Heading size="md" alignSelf="center">
            My Profile
          </Heading>

          <Avatar
            name={
              user
                ? user.username.replace(
                    user.username[user.username.length - 2],
                    " "
                  )
                : "?"
            }
            src={user ? <></> : noProfile}
            size="2xl"
            borderRadius="0.8rem"
            marginBottom="0.8rem"
            _hover={{
              opacity: "0.9",
              boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)",
              cursor: "pointer",
            }}
          />

          <Button
            variant="ghost"
            colorScheme="brand"
            borderRadius="0.6rem"
            size="lg"
            as={Link}
            to="/Edit-Profile"
            width="100%"
            alignSelf="center"
            justifySelf="center"
          >
            Edit Profile
          </Button>
        </Flex>

        <Flex flexDir="column" gap="0.6rem">
          <Box fontSize="1.5rem">
            <b>{user ? user.username : "No Profile found"}</b>
          </Box>
          <Box>Role: {user ? user.role : " "}</Box>
          <Box>Phone: {user ? user.phone : " "}</Box>
          <Box>Email: {user ? user.email : " "}</Box>
        </Flex>

        <Flex flexDir="column" gap="0.2rem">
          <Box>Total Reviews: {ratio ? ratio.total : 0}</Box>
          <Box>Total Likes: {ratio ? ratio.likes : 0}</Box>
          <Box>Total Dislikes: {ratio ? ratio.dislikes : 0}</Box>
          <Box>
            Ratio: <b>{ratio ? ratio.ratio : 0}</b>
            {ratio ? (
              ratio.ratio > 0 ? (
                <Icon color="green.500">
                  <AiFillLike size="20px" />
                </Icon>
              ) : (
                <Icon color="red.500">
                  <AiFillDislike size="20px" />
                </Icon>
              )
            ) : (
              <></>
            )}
          </Box>
          <Box fontSize=".8rem" color="gray.500" fontStyle="italic">
            Ratio is used to determine the usefulness of your Reviews.
            <br />
            A postive ratio means that your Reviews are helpful,
            <br />
            hence liked by Users.
            <br />
            <br />
            Calculation: (Total Likes - Total Dislikes) / Total Reviews.
          </Box>
        </Flex>

        <Flex flexDir="column" fontSize="1rem">
          <Box>Date of Creation: {user ? user.date : " "}</Box>
        </Flex>
      </Flex>

      <Flex
        flexDir="column"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 0.8)"
        )}
        gap="2rem"
        m="2%"
        p="1.4rem"
        fontSize="1.2rem"
        borderRadius="1.2rem"
        flexWrap="wrap"
      >
        <Heading size="md" alignSelf="center">
          My Restaurants
        </Heading>

        {user ? (
          <>
            <Button
              variant="outline"
              colorScheme="brand"
              borderRadius="0.6rem"
              size="lg"
              onClick={() => alert("This feature will not be released.")}
            >
              Create Restaurant
            </Button>

            <Flex
              flexDir="row"
              gap="1rem"
              justifyContent="space-between"
              textDecor="underline"
              flexWrap="wrap"
              textUnderlineOffset="0.4rem"
              fontWeight="bold"
              _hover={{ cursor: "pointer", textDecorationColor: "brand.300" }}
            >
              <p>Restaurant</p>
              <p>Description</p>
              <p>Edit</p>
            </Flex>

            {restaurants && restaurants.success !== false ? (
              restaurants.map((restaurant, index) => (
                <Flex
                  flexDir="row"
                  gap="1rem"
                  key={index}
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Button
                    colorScheme="brand"
                    variant="link"
                    fontWeight="bold"
                    fontSize="1.2rem"
                    onClick={() =>
                      window.open(
                        `/restaurant/${restaurant.idRestaurant}`,
                        "_blank"
                      )
                    }
                  >
                    {restaurant.name}
                  </Button>

                  <Text
                    fontSize="1rem"
                    fontWeight="normal"
                    fontStyle="italic"
                    color="gray.500"
                    maxW="70%"
                  >
                    {restaurant.description}
                  </Text>

                  <Button
                    onClick={() => alert("This feature will not be released.")}
                  >
                    <MdEdit />
                  </Button>
                </Flex>
              ))
            ) : (
              <Text>You do not own any Restaurants.</Text>
            )}
          </>
        ) : (
          <Flex
            align="center"
            justify="center"
            flexDir="column"
            fontSize="1rem"
          >
            <p>You are not Logged in.</p>
          </Flex>
        )}
      </Flex>

      <Flex
        flexDir="column"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 0.8)"
        )}
        gap="2rem"
        m="2%"
        p="1.4rem"
        fontSize="1.2rem"
        borderRadius="1.2rem"
        flexWrap="wrap"
      >
        <Heading size="md" alignSelf="center">
          My Reviews
        </Heading>
        {user ? (
          user.restaurants ? (
            <>
              <Flex
                flexDir="row"
                gap="1rem"
                justifyContent="space-between"
                textDecor="underline"
                flexWrap="wrap"
                textUnderlineOffset="0.4rem"
                fontWeight="bold"
                _hover={{ cursor: "pointer", textDecorationColor: "brand.300" }}
              >
                <p>Restaurant</p>
                <p>Review</p>
              </Flex>
              {user.restaurants.split(",").map((restaurant, index) => (
                <Flex
                  flexDir="row"
                  gap="1rem"
                  key={index}
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <b>{restaurant}:</b>
                  <Flex gap="1rem" flexDir="row">
                    <Text color="gray.500">
                      {user.reviews.split(",")[index]}
                    </Text>
                    <b>
                      {user.ratings.split(",")[index]}{" "}
                      <Icon name="star" color="brand.300">
                        <AiFillStar size="24px" />
                      </Icon>
                    </b>
                  </Flex>
                </Flex>
              ))}
            </>
          ) : (
            <Flex
              align="center"
              justify="center"
              flexDir="column"
              fontSize="1rem"
            >
              <p>You have not reviewed any Restaurants yet.</p>
            </Flex>
          )
        ) : (
          <Flex
            align="center"
            justify="center"
            flexDir="column"
            fontSize="1rem"
          >
            <p>You are not Logged in.</p>
          </Flex>
        )}
      </Flex>
    </Grid>
  );
}
