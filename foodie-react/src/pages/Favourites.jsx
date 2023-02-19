import { Flex, Grid, Heading, Tag, TagLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/Restaurant2";
import { useAuth } from "../context/AuthContext";

export default function Favourites() {
  const user = useAuth().user;

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/list/favourites", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "Session Token DO-NOT-SHARE"
          )}`,
        },
      });
      const data = await response.json();
      setRestaurants(data);
    })();
  }, [user]);

  return (
    <Flex flexDir="column" w="100%" minH="80vmin" mt="-1.2rem" flexWrap="wrap">
      <Heading size="lg" m="1.2rem" mt="2rem">
        {user === null ? <></> : user.username + "'s" + " "}
        Favourites
      </Heading>

      {restaurants.success === false ? (
        <Tag
          size="md"
          borderRadius=".8rem"
          padding="1.2rem"
          h="max-content"
          w="max-content"
          m=".8rem"
          pos="relative"
          justifySelf="center"
        >
          <TagLabel>Login to use this feature.</TagLabel>
        </Tag>
      ) : (
        <Grid
          templateColumns="repeat(auto-fit, minmax(16rem, 20rem))"
          gap="6.9vmin"
          mt="1.2rem"
          mb="2rem"
          w="100%"
          minH="80vmin"
          justifyContent="center"
        >
          {restaurants.length === 0 ? (
            <>
              <Tag
                size="md"
                variant="subtle"
                borderRadius=".8rem"
                padding="1.2rem"
                h="max-content"
                w="max-content"
                className="noResults"
                pos="relative"
                top="0"
                justifySelf="center"
              >
                <TagLabel>No Restaurants in List</TagLabel>
              </Tag>
            </>
          ) : (
            restaurants
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((restaurant) => (
              <RestaurantCard
                key={restaurant.name}
                restaurant={restaurant}
                t="F"
              />
            ))
          )}
        </Grid>
      )}
    </Flex>
  );
}
