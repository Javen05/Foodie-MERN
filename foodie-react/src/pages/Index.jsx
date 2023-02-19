import {
  Box,
  Button,
  DarkMode,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  Menu,
  MenuButton,
  MenuList,
  Radio,
  RadioGroup,
  Stack,
  Tag,
  TagLabel,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BsFilter, BsSortDownAlt } from "react-icons/bs";
import { HiSearchCircle } from "react-icons/hi";
import RestaurantCard from "../components/Restaurant";
import { MdOutlineHistory, MdTrendingUp } from "react-icons/md";

export default function Main() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("restaurants.idRestaurant");

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch("/api/restaurant")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      });
  }, []);

  let logSearchCalled = false;

  const searchRecommendations = () => {
    const sessionToken = localStorage.getItem("Session Token DO-NOT-SHARE");

    if (
      search === "" &&
      sessionToken !== null &&
      recommendations.length === 0
    ) {
      fetch("/api/restaurant/log", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setRecommendations(data);
        });
    } else {
      setRecommendations([]);
    }
  };

  const searchFunction = () => {
    setRecommendations([]);

    if (
      logSearchCalled === false &&
      search !== "" &&
      localStorage.getItem("Session Token DO-NOT-SHARE") !== null
    ) {
      logSearchCalled = true;
      fetch("/api/restaurant/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
        },
        body: JSON.stringify({
          search: search,
        }),
      });
    }

    fetch("/api/restaurant/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        search: search,
        category: category,
        sort: sort,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
        logSearchCalled = false;
      });
  };

  return (
    <>
      <Flex>
        <form
          onSubmit={() => {
            searchFunction();
          }}
          action="javascript:void(0)"
        >
          <Flex zIndex="100" position="fixed" direction="column" w="100%">
            <Flex
              flexDir="column"
              w="100%"
              bgColor="brand.300"
              padding="0.6rem"
              borderBottomRadius="0.6rem"
            >
              <Flex
                flexDir="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <InputGroup
                  bgColor="brand.50"
                  borderRadius="0.6rem"
                  h="2rem"
                  width="calc(100% - 126px)"
                  minWidth="calc(80px + 20vmin)"
                  mb="0.6rem"
                >
                  <LightMode>
                    <Input
                      className="search-input"
                      textColor="black"
                      borderColor="brand.200"
                      focusBorderColor="brand.800"
                      type="text"
                      placeholder="Search"
                      onClick={() => {
                        searchRecommendations();
                      }}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </LightMode>
                  <InputRightElement>
                    <DarkMode>
                      <IconButton
                        variant="outline"
                        onClick={() => {
                          searchFunction();
                        }}
                        type="submit"
                        icon={
                          <HiSearchCircle
                            size="40px"
                            fill="var(--chakra-colors-brand-200)"
                          />
                        }
                      />
                    </DarkMode>
                  </InputRightElement>
                </InputGroup>
                <Flex flexDir="column" flexWrap="wrap">
                  <Flex
                    flexWrap="wrap"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                  >
                    <Menu closeOnSelect={false}>
                      <Tooltip
                        label="Filter"
                        aria-label="Filter"
                        placement="bottom"
                        bgColor={useColorModeValue("brand.500", "brand.50")}
                      >
                        <DarkMode>
                          <MenuButton
                            as={Button}
                            variant="ghost"
                            color="brand.50"
                          >
                            <BsFilter size="32px" />
                          </MenuButton>
                        </DarkMode>
                      </Tooltip>
                      <LightMode>
                        <MenuList
                          borderColor="brand.50"
                          bgColor="purple.100"
                          color="black"
                        >
                          <Flex alignItems="center" flexDir="column">
                            <Box mb=".4rem" textDecor="underline">
                              <b>Filter</b>
                            </Box>
                            <Input
                              type="text"
                              w="94%"
                              value={category}
                              onChange={(event) =>
                                setCategory(event.target.value)
                              }
                              placeholder="Type a Category"
                            />
                            <Button
                              w="94%"
                              variant="outline"
                              borderWidth=".8px"
                              mt=".6rem"
                              onClick={() => searchFunction()}
                            >
                              Go
                            </Button>
                          </Flex>
                        </MenuList>
                      </LightMode>
                    </Menu>
                    <Menu closeOnSelect={false}>
                      <Tooltip
                        label="Sort"
                        aria-label="Sort"
                        placement="bottom"
                        bgColor={useColorModeValue("brand.500", "brand.50")}
                      >
                        <DarkMode>
                          <MenuButton
                            as={Button}
                            variant="ghost"
                            color="brand.50"
                          >
                            <BsSortDownAlt size="30px" />
                          </MenuButton>
                        </DarkMode>
                      </Tooltip>
                      <LightMode>
                        <MenuList
                          minWidth="auto"
                          borderColor="brand.50"
                          bgColor="purple.100"
                          color="black"
                          overflowY="scroll"
                          maxH="27vh"
                          //customise scrollbar
                          css={{
                            "&::-webkit-scrollbar": {
                              width: "0.8em",
                            },
                            "&::-webkit-scrollbar-track": {
                              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "rgba(0,0,0,0.2)",
                              borderRadius: "0.6rem",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                              backgroundColor: "rgba(0,0,0,0.3)",
                            },
                          }}
                        >
                          <Flex flexDir="column" w="8rem">
                            <RadioGroup onChange={setSort} value={sort}>
                              <Stack ml=".8rem">
                                <Radio value="restaurants.idRestaurant">
                                  {" "}
                                  Oldest{" "}
                                </Radio>
                                <Radio value="COUNT(rating) DESC">
                                  Popular{" "}
                                </Radio>
                                <Radio value="RAND()"> Random </Radio>
                                <Radio value="AVG(rating) DESC">Ratings </Radio>
                                <Radio value="restaurants.date DESC">
                                  Recent{" "}
                                </Radio>
                                <Radio value="name ASC"> A - Z </Radio>
                              </Stack>
                            </RadioGroup>
                            <Button
                              w="80%"
                              variant="solid"
                              borderWidth="2px"
                              alignSelf="center"
                              mt=".6rem"
                              onClick={() => searchFunction()}
                            >
                              Apply
                            </Button>
                          </Flex>
                        </MenuList>
                      </LightMode>
                    </Menu>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            {recommendations.length > 0 && (
              <>
                <Box
                  position="fixed"
                  zIndex="-1"
                  w="100%"
                  h="100%"
                  bgColor={useColorModeValue("white", "gray.800")}
                  opacity=".2"
                  onClick={() => {
                    setRecommendations([]);
                  }}
                />
                <Box
                  w="calc(100% - 145px)"
                  h="max-content"
                  m=".6rem"
                  borderRadius=".8rem"
                  bgColor={useColorModeValue("brand.50", "brand.700")}
                >
                  {recommendations.map((item) => (
                    <Button
                      key={item.searchQuery}
                      onClick={() => {
                        setSearch(item.searchQuery);
                      }}
                      w="100%"
                      flexDir="row"
                      justifyContent="space-between"
                      variant="ghost"
                      _hover={{
                        bgColor: useColorModeValue("brand.100", "brand.600"),
                      }}
                    >
                      <p>{item.searchQuery}</p>
                      <Icon
                        as={
                          item.count === null ? MdOutlineHistory : MdTrendingUp
                        }
                      />
                    </Button>
                  ))}
                </Box>
              </>
            )}
          </Flex>
        </form>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fit, minmax(14rem, 15rem))"
        gap="6.9vmin"
        w="100%"
        mt="6.9rem"
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
              <TagLabel>No results found</TagLabel>
            </Tag>
          </>
        ) : (
          <></>
        )}
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.name} restaurant={restaurant} />
          );
        })}
      </Grid>

      <Flex justifyContent="center" margin="1rem 0" pb=".2rem">
        <Heading size="md" color="theme">
          {restaurants.length} Results
        </Heading>
      </Flex>
    </>
  );
}
