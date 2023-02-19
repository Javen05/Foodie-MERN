import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  CloseButton,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
  Tooltip,
  useColorModeValue,
  Link as ChakraLink,
  LightMode,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Grid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundBack,
  IoMdBookmark,
  IoMdCreate,
  IoMdHeart,
  IoMdRefresh,
} from "react-icons/io";
import { BiCollapse, BiExpand } from "react-icons/bi";
import { MdUpdate, MdTrendingUp } from "react-icons/md";
import { GiRoundStar } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import placeholder from "../assets/images/placeholder.png";
import Rating from "../components/Rating";
import ReviewPrompt from "../components/Review";
import EditReview from "../components/EditReview";
import ReviewProfile from "../components/ReviewProfile";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { motion } from "framer-motion";

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState(null);
  const [categories, setCategories] = useState(null);
  const [review, setReview] = useState(null);
  const [branches, setBranches] = useState(null);
  const [upvotes, setUpvotes] = useState(new Map());
  const idRestaurant = window.location.pathname.split("/")[2];
  const location = useLocation();

  const [image, setImage] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(0);

  const [hasReview, setHasReview] = useState(false);
  const [alert, setAlert] = useState("");

  const [exist, setExist] = useState(true);
  const [ratio, setRatio] = useState(0);
  const [percent, setPercent] = useState(0);

  const [reviewFilter, setReviewFilter] = useState([]);
  const [reviewRange] = useState([]);
  const [reviewSort, setReviewSort] = useState("Latest");

  const [expOrCol, setExpOrCol] = useState("E");
  const color = useColorModeValue("white", "black");

  // for random restaurant picker
  const randomPicker = async () => {
    await idRestaurant;

    if (idRestaurant === undefined) {
      fetch("/api/restaurant")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const random = Math.floor(Math.random() * data.length);
          window.location.replace(`${window.location.href}/${random + 1}`);
        });
    }
  };

  // fetch restaurant data
  const fetchRestaurant = () => {
    fetch("/api/restaurant/" + idRestaurant)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.restaurant[0].name === null) {
          setExist(false);
          return;
        }

        setImage(data.restaurant[0].images.split(","));
        setRestaurant(data.restaurant[0]);
        setCategories(data.categories);
        setBranches(data.branches);
      });
  };

  const calcStats = (review) => {
    for (const rev of review) {
      if (!reviewRange.includes(rev.rating)) {
        reviewRange.push(rev.rating);
      }
      setReviewFilter(reviewRange);
    }

    review.length > 0
      ? (setPercent(
          // percentage of positive reviews in all reviews
          Math.round(
            (review.filter((review) => review.rating > 2).length /
              review.length) *
              100
          )
        ),
        setRatio(
          // average rating of all reviews
          (
            review.reduce(
              (total, review) => (total += parseInt(review.rating)),
              0
            ) / review.length
          ).toFixed(2)
        ))
      : // when no reviews yet
        (setPercent("?"), setRatio("?"));
  };

  // async to ensure each step is COMPLETED before moving on to the next
  const fetchReviews = async () => {
    const revRes = await fetch("/api/review/" + idRestaurant);
    const revData = await revRes.json();
    await setReview(revData);
    calcStats(revData);

    const upvRes = await fetch("/api/upvote/" + idRestaurant);
    const upvData = await upvRes.json();
    await setUpvotes(new Map());

    // map upvotes with account id as key, to 'join' with review data
    for (const item of upvData) {
      setUpvotes((prevUpvotes) => {
        return new Map([...prevUpvotes, [item.idAccount, item.ratio]]);
      });
    }
  };

  const fetchEditReview = async () => {
    const response = await fetch("/api/review/edit/" + idRestaurant, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
    });
    const data = await response.json();

    if (data.success === false);
    else if (data.find((item) => item.restaurants === restaurant.name)) {
      setHasReview(true);
    }
  };

  useEffect(() => {
    randomPicker();
    fetchRestaurant();
  }, [location]); // whenever new restaurant; href changes

  useEffect(() => {
    fetchReviews();
  }, [restaurant]); // update edit button after leaving review

  useEffect(() => {
    fetchEditReview();
  }, [review]);

  // toggle full screen review box
  const expandReviewBox = (expOrCol) => {
    const reviewBox = document.getElementById("reviewBox");

    if (expOrCol === "E") {
      reviewBox.style.cssText = `max-height: 100%; width: 100%; margin: 0; position: fixed; top: 0; left: 0; z-index: 1000; border-radius: 0; background-color: ${color};`;
      setExpOrCol("C");
    } else {
      reviewBox.style.cssText = "max-height: 40rem; margin: 2rem 0;";
      setExpOrCol("E");
    }
  };

  const addUpvote = (idRestaurant, idAccount, vote) => {
    fetch("/api/upvote/edit/" + idRestaurant, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        idAccount: idAccount,
        vote: vote,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAlert(data.message);

        setTimeout(() => {
          setAlert("");
        }, 2000);

        fetch("/api/upvote/" + idRestaurant)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setUpvotes(new Map());

            for (const item of data) {
              setUpvotes((prevUpvotes) => {
                return new Map([...prevUpvotes, [item.idAccount, item.ratio]]);
              });
            }
          });
      });
  };

  // favourite or bookmark the restaurant
  const addToList = (type) => {
    if (!localStorage.getItem("Session Token DO-NOT-SHARE")) {
      setAlert("Login to use this feature.");

      setTimeout(() => {
        setAlert("");
      }, 1500);

      return;
    }

    fetch("/api/list/" + type, {
      method: "POST",
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
        if (result.code === "ER_DUP_ENTRY") {
          fetch("/api/list/" + type, {
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

  const [i, setI] = useState(0); // i = index of image array
  const [pauseSlides, setPauseSlides] = useState(false); // pause auto change of image

  const nextImage = () => {
    setI(i === image.length - 1 ? 0 : i + 1); // reset to 0 if i is at the end of the array
    setPauseSlides(true);
  };
  const prevImage = () => {
    setI(i === 0 ? image.length - 1 : i - 1); // reset to last index if i is at the beginning of the array
    setPauseSlides(true);
  };

  // auto change image every 5 seconds
  useEffect(() => {
    if (pauseSlides) return;

    const interval = setInterval(() => {
      setI(i === image.length - 1 ? 0 : i + 1);
    }, 5000);
    // ensure only 1 interval is running
    return () => clearInterval(interval);
  }, [image, i]);

  return (
    <Box margin="1.2rem 1rem">
      {/* back button */}
      <Tooltip label="Go back" aria-label="Go back" placement="left">
        <Button
          as={Link}
          to="/"
          variant="outline"
          borderWidth="0.15rem"
          position="fixed"
          zIndex="99"
          top="8rem"
          right="1rem"
          colorScheme="brand"
          backgroundColor={useColorModeValue("white", "gray.800")}
          size="sm"
        >
          <IoMdArrowRoundBack size="20px" />
        </Button>
      </Tooltip>

      {/* whole restaurant page */}
      {restaurant ? (
        <Flex
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          margin="2rem 0"
        >
          <Flex
            h="24rem"
            flexDir="column"
            w="100%"
            alignItems="center"
            justifyContent="center"
          >
            <Flex
              minH="24rem"
              w="100%"
              borderRadius="0.8rem"
              borderWidth="0.2rem"
              borderColor={useColorModeValue("brand.300", "brand.50")}
              align="center"
              justify="space-between"
            >
              <Button
                variant="ghost"
                h="100%"
                color={useColorModeValue("brand.300", "brand.50")}
                borderRadius="0.6rem"
                size="sm"
                onClick={prevImage}
              >
                <IoIosArrowBack size="26px" />
              </Button>
              <motion.div
                style={{ height: "100%", width: "auto" }}
                variants={{
                  initial: {
                    scale: 0,
                    transformOrigin: "center",
                  },
                  expand: {
                    scale: 1,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 1.0, 0.25, 1.0],
                    },
                  },
                  move: {
                    transition: {
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  },
                }}
                initial="initial"
                animate="expand"
                exit="move"
                whileInView={() => {
                  setPauseSlides(false);
                }}
                whileHover={{
                  zIndex: 1,
                  transition: { duration: 0.4, delay: 0.2 },
                  width: "100%",
                }}
                whileTap={{
                  zIndex: 1000,
                  transition: { duration: 0.3, delay: 0.2 },
                  scale: 1.1,
                  width: "auto",
                }}
              >
                <Image
                  src={
                    "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/banners/" +
                    image[i] +
                    ".jpg"
                  }
                  fallbackSrc={placeholder}
                  alt={restaurant.name}
                  bgColor={useColorModeValue("brand.50", "brand.900")}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  mb=".2rem"
                />
              </motion.div>
              <Button
                variant="ghost"
                h="100%"
                color={useColorModeValue("brand.300", "brand.50")}
                borderRadius="0.6rem"
                size="sm"
                onClick={nextImage}
              >
                <IoIosArrowForward size="26px" />
              </Button>
            </Flex>

            <LightMode>
              <Tag
                pos="relative"
                bottom="2.4rem"
                tabIndex={0}
                onKeyDown={nextImage}
                aria-label="Next image"
              >
                {i + 1} / {image.length}
              </Tag>
            </LightMode>
          </Flex>

          <Heading size="xl" margin=".5rem 0">
            {restaurant.name}
          </Heading>

          <Box size="md" margin="0">
            Published on {restaurant.date}
          </Box>

          <Flex justifyContent="center" w="98%" flexWrap="wrap">
            <Box w="100%">
              <motion.div
                initial={{ opacity: 0, y: 38 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5, ease: "easeInOut" }}
              >
                <Grid
                  templateColumns="3fr 1fr"
                  gap="1rem"
                  justifyContent="center"
                >
                  <Flex
                    flexDir="column"
                    margin="2rem 0"
                    gap="1rem"
                    minW="calc(80% + 1rem)"
                    minH="8rem"
                    borderWidth="0.2rem"
                    borderColor={useColorModeValue("brand.300", "brand.50")}
                    p=".8rem"
                    borderRadius=".8rem"
                  >
                    <Heading size="md">Description:</Heading>
                    <Box>
                      <em>{restaurant.description}</em>
                    </Box>
                  </Flex>
                  <Flex
                    flexDir="column"
                    margin="2rem 0"
                    gap="2rem"
                    minWidth="calc(20% - 2rem)"
                    minH="8rem"
                    borderWidth="0.2rem"
                    borderColor={useColorModeValue("brand.300", "brand.50")}
                    p=".4rem"
                    borderRadius=".8rem"
                  >
                    <Flex
                      justify="center"
                      flexWrap="wrap"
                      h="100%"
                      maxH="140px"
                    >
                      <Button
                        gap="1.2rem"
                        onClick={() => addToList("favourites")}
                        w="100%"
                        h="50%"
                        opacity={0.9}
                        colorScheme="purple"
                        variant="solid"
                        size="md"
                        borderRadius="10px 10px 0 0"
                        overflow="hidden"
                      >
                        Favourite <IoMdHeart size="24px" />
                      </Button>
                      <Button
                        gap="1rem"
                        onClick={() => addToList("bookmarks")}
                        w="100%"
                        h="50%"
                        mb=".8rem"
                        opacity={0.9}
                        colorScheme="blue"
                        variant="solid"
                        size="md"
                        borderRadius="0 0 10px 10px"
                        color={useColorModeValue("white")}
                        overflow="hidden"
                      >
                        Bookmark
                        <IoMdBookmark size="24px" />
                      </Button>
                    </Flex>
                  </Flex>
                </Grid>
              </motion.div>
            </Box>

            <Box width="100%">
              <motion.div
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <Flex
                  flexDir="column"
                  margin="2rem 0"
                  gap="1rem"
                  minH="8rem"
                  borderWidth="0.2rem"
                  borderColor={useColorModeValue("brand.300", "brand.50")}
                  p=".8rem"
                  borderRadius=".8rem"
                  tabIndex={0}
                  _focus={{
                    boxShadow: "0 0 0 4px #1E90FF",
                  }}
                >
                  <Heading size="md">Categories:</Heading>
                  <Flex gap=".8rem" justifyContent="center" flexWrap="wrap">
                    {categories ? (
                      categories.map((category) => {
                        return (
                          <Flex
                            as={Tag}
                            key={category.category}
                            category={category}
                            colorScheme="purple"
                            m="0.8rem 0"
                            justifyContent="center"
                            p=".6rem"
                            borderRadius="full"
                          >
                            {category.category}
                          </Flex>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
              </motion.div>
            </Box>

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
          </Flex>

          <Box alignSelf="center" w="98%">
            <motion.div
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              initial={{ opacity: 0, translateY: 38 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
            >
              <Flex
                id="reviewBox"
                flexDir="column"
                margin="2rem 0"
                gap=".6rem"
                maxH="40rem"
                borderWidth="0.2rem"
                borderColor={useColorModeValue("brand.300", "brand.50")}
                p=".8rem"
                pb="0"
                borderRadius=".8rem"
              >
                <Flex w="100%" flexDir="row" justifyContent="space-between">
                  <Heading size="md" as="u" textUnderlineOffset="0.2rem">
                    Reviews
                  </Heading>
                  <Tooltip
                    label={expOrCol === "C" ? "Collapse" : "Expand"}
                    aria-label="Expand Reviews"
                    placement="left"
                  >
                    <Button
                      p="0"
                      colorScheme="purple"
                      variant={expOrCol === "C" ? "solid" : "outline"}
                      onClick={() => expandReviewBox(expOrCol)}
                    >
                      <Icon
                        boxSize={expOrCol === "C" ? "1.35rem" : "1.25rem"}
                        as={expOrCol === "C" ? BiCollapse : BiExpand}
                      />
                    </Button>
                  </Tooltip>
                </Flex>
                {review ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    viewport={{ once: true }}
                  >
                    <Flex
                      w="100%"
                      flexDir="row"
                      align="center"
                      justifyContent="space-around"
                      flexWrap="wrap"
                      gap="1rem"
                    >
                      <Flex align="center" flexDir="row">
                        <CircularProgress
                          value={ratio * 20}
                          color={"orange"}
                          size="4rem"
                        >
                          <CircularProgressLabel>
                            <Text as="b">{ratio}</Text>
                          </CircularProgressLabel>
                        </CircularProgress>
                        <Flex flexDir="row" mt="1.2rem">
                          <Text>/5</Text>
                          <Icon as={GiRoundStar} mt=".26rem" color="orange" />
                        </Flex>
                      </Flex>
                      <Flex
                        align="center"
                        flexDir="column"
                        display={percent === "?" ? "none" : "flex"}
                      >
                        <CircularProgress
                          value={percent ? percent : review.length * 10}
                          color={percent ? "green.400" : "red.400"}
                        >
                          <CircularProgressLabel>
                            {percent ? <>{percent}% </> : review.length}
                          </CircularProgressLabel>
                        </CircularProgress>
                        <Text fontSize="sm" color="gray.500" m="0.2rem">
                          {percent ? (
                            <>of {review.length} reviews are positive</>
                          ) : (
                            <>
                              <b>Negative</b> reviews
                            </>
                          )}
                        </Text>
                      </Flex>
                      <Flex gap=".8rem" justifyContent="center" flexWrap="wrap">
                        {reviewRange.sort().map((rating) => (
                          <Tag
                            as={Button}
                            key={rating}
                            variant={
                              reviewFilter.includes(rating)
                                ? "solid"
                                : "outline"
                            }
                            colorScheme="orange"
                            onClick={() => {
                              if (reviewRange === reviewFilter) {
                                setReviewFilter([rating]);
                              } else if (reviewFilter.includes(rating)) {
                                setReviewFilter(
                                  reviewFilter.filter((item) => item !== rating)
                                );
                              } else {
                                setReviewFilter([...reviewFilter, rating]);
                              }
                            }}
                          >
                            <TagLabel>{rating}</TagLabel>
                            <TagRightIcon as={GiRoundStar} />
                          </Tag>
                        ))}
                        <Tooltip
                          label="Reset Filter"
                          aria-label="Reset"
                          placement="right"
                        >
                          <Button
                            p="0"
                            onClick={() => setReviewFilter(reviewRange)}
                            visibility={
                              reviewRange === reviewFilter
                                ? "hidden"
                                : "visible"
                            }
                          >
                            <Icon as={IoMdRefresh} boxSize="1.2rem" />
                          </Button>
                        </Tooltip>
                      </Flex>
                      <Flex gap="1rem" justifyContent="center" flexWrap="wrap">
                        {[
                          ["Latest", MdUpdate],
                          ["Popular", MdTrendingUp],
                        ].map((sortBy) => (
                          <Button
                            as={Tag}
                            key={sortBy[0]}
                            variant={
                              reviewSort == sortBy[0] ? "solid" : "outline"
                            }
                            colorScheme="teal"
                            onClick={() => setReviewSort(sortBy[0])}
                          >
                            <TagLabel>{sortBy[0]}</TagLabel>
                            <TagRightIcon as={sortBy[1]} />
                          </Button>
                        ))}
                      </Flex>
                    </Flex>
                  </motion.div>
                ) : (
                  <></>
                )}
                <Tooltip
                  label={
                    localStorage.getItem("Session Token DO-NOT-SHARE")
                      ? ""
                      : "Login to write a Review"
                  }
                  aria-label="Write a review"
                  placement="top"
                >
                  <Button
                    p="10px"
                    colorScheme="purple"
                    borderLeftWidth={10}
                    borderRightWidth={10}
                    borderColor={useColorModeValue("brand.300", "brand.50")}
                    isDisabled={
                      localStorage.getItem("Session Token DO-NOT-SHARE")
                        ? false
                        : true
                    }
                    onClick={
                      hasReview === true
                        ? () => setIsEditModalOpen(true)
                        : () => setIsModalOpen(true)
                    }
                    gap=".8rem"
                  >
                    {hasReview === true ? (
                      <p>Edit Review</p>
                    ) : (
                      <p>Write Review</p>
                    )}
                    <Icon as={IoMdCreate} size="20px" />
                  </Button>
                </Tooltip>
                <ReviewPrompt
                  restaurant={restaurant.name}
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
                <EditReview
                  restaurant={restaurant.name}
                  isOpen={isEditModalOpen}
                  onClose={() => setIsEditModalOpen(false)}
                />
                <ReviewProfile
                  isOpen={profileModalOpen}
                  onClose={() => setProfileModalOpen("")}
                />
                <Flex
                  gap=".8rem"
                  justifyContent="center"
                  flexWrap="wrap"
                  bg
                  overflowY="scroll"
                  overflowX="scroll"
                  css={{
                    scrollBehavior: "smooth",
                    "&::-webkit-scrollbar": {
                      width: "0.6rem",
                    },
                    "&::-webkit-scrollbar-track": {
                      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: useColorModeValue(
                        "rgba(0,0,0,0.2)",
                        "rgba(255,255,255,0.2)"
                      ),
                      borderRadius: "0.6rem",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      backgroundColor: useColorModeValue(
                        "rgba(0,0,0,0.3)",
                        "rgba(255,255,255,0.3)"
                      ),
                    },
                  }}
                >
                  {review ? (
                    review
                      .filter((review) =>
                        reviewFilter.some((rating) => review.rating == rating)
                      )
                      .sort((a, b) => {
                        if (reviewSort !== "Latest") {
                          return (
                            (upvotes.get(b.idAccount) || 0) -
                            (upvotes.get(a.idAccount) || 0)
                          );
                        }
                      })
                      .map((review, cIndex) => {
                        const username = review.username;
                        return (
                          <Box w="98%">
                            <motion.div
                              transition={{
                                duration: 0.25,
                                ease: [0.6, 0.01, -0.05, 0.8],
                                type: "spring",
                                stiffness: 80,
                              }}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                            >
                              <Flex
                                bgColor="brand.50"
                                key={cIndex}
                                review={review}
                                flexDir="row"
                                color="black"
                                m="0.8rem 0.2rem"
                                justifyContent="center"
                                p=".8rem"
                                borderRadius="1.2rem"
                              >
                                <Button
                                  m="0"
                                  p="0"
                                  variant="primary"
                                  onClick={() => setProfileModalOpen(username)}
                                >
                                  <Avatar
                                    name={review.username.replace(
                                      review.username[
                                        review.username.length - 2
                                      ],
                                      " "
                                    )}
                                    size="md"
                                  />
                                </Button>
                                <Flex w="100%" flexDir="column" color="black">
                                  <Box
                                    fontWeight="bold"
                                    fontSize="1.2rem"
                                    ml="1.8vmin"
                                  >
                                    {review.username}
                                  </Box>
                                  <Box w="calc(6rem + 10vmin)">
                                    <Rating rating={review.rating} />
                                  </Box>
                                  <Box fontSize="1.2rem" ml="2vmin">
                                    {review.review}
                                  </Box>
                                  <Flex gap="0.8rem" ml="1.8vmin">
                                    <>Posted on: </>
                                    {review.date.slice(0, 10)}
                                    {review.edited == "T" ? <i>Edited</i> : ""}
                                  </Flex>
                                </Flex>
                                <Flex
                                  flexDir="column"
                                  justifyContent="space-around"
                                  alignItems="center"
                                  ml="1.8vmin"
                                >
                                  <IconButton
                                    aria-label="Upvote"
                                    icon={<ImArrowUp />}
                                    onClick={() =>
                                      addUpvote(
                                        review.idRestaurant,
                                        review.idAccount,
                                        "L"
                                      )
                                    }
                                  />
                                  <Flex>{upvotes.get(review.idAccount)}</Flex>
                                  <IconButton
                                    aria-label="Downvote"
                                    icon={<ImArrowDown />}
                                    onClick={() =>
                                      addUpvote(
                                        review.idRestaurant,
                                        review.idAccount,
                                        "D"
                                      )
                                    }
                                  />
                                </Flex>
                              </Flex>
                            </motion.div>
                          </Box>
                        );
                      })
                  ) : (
                    <></>
                  )}
                </Flex>
              </Flex>
            </motion.div>
          </Box>

          {branches.length !== 0 ? (
            <Box width="98%">
              <motion.div
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <Flex
                  flexDir="column"
                  margin="2rem 0"
                  gap="1rem"
                  borderWidth="0.2rem"
                  borderColor={useColorModeValue("brand.300", "brand.50")}
                  p=".8rem"
                  borderRadius=".8rem"
                >
                  <Heading size="md">Branches:</Heading>
                  <Flex flexDir="row" flexWrap="wrap">
                    {branches ? (
                      branches.map((branch, index) => {
                        return (
                          <Flex
                            w="max-content"
                            m=".8rem"
                            alignItems="center"
                            key={index}
                            branch={branch}
                            p=".2rem"
                            borderRadius=".6rem"
                            bgColor="brand.50"
                            flexDir="column"
                          >
                            <Popover isLazy={true}>
                              <PopoverTrigger>
                                <Box>
                                  <Tooltip
                                    label={
                                      branch.titles
                                        ? "More Details"
                                        : "No Details"
                                    }
                                    placement="top"
                                    hasArrow
                                  >
                                    <Button colorScheme="purple">
                                      {branch.branch}
                                    </Button>
                                  </Tooltip>
                                </Box>
                              </PopoverTrigger>
                              <PopoverContent
                                placement="bottom"
                                bg="brand.50"
                                color="black"
                              >
                                <PopoverArrow />
                                <PopoverCloseButton />

                                <PopoverHeader as="b">
                                  {branch.branch}
                                </PopoverHeader>

                                <PopoverBody>
                                  {branch.titles ? (
                                    branch.titles &&
                                    branch.contents &&
                                    branch.titles
                                      .split(",")
                                      .map((title, index) => {
                                        return (
                                          <Flex
                                            key={index}
                                            flexDir="row"
                                            gap="0.8rem"
                                            justifyContent="space-between"
                                            w="100%"
                                          >
                                            <Text as="kbd">{title}:</Text>
                                            <Text>
                                              {
                                                branch.contents.split(",")[
                                                  index
                                                ]
                                              }
                                            </Text>
                                          </Flex>
                                        );
                                      })
                                  ) : (
                                    <Text as="cite">No details available</Text>
                                  )}
                                </PopoverBody>
                              </PopoverContent>
                            </Popover>
                          </Flex>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Flex>
                </Flex>
              </motion.div>
            </Box>
          ) : (
            <></>
          )}

          {restaurant.menu ? (
            <>
              <Heading size="md" mb="0.8rem" textDecor="underline">
                Menu
              </Heading>

              <Tooltip label="Click to enlarge" placement="top">
                <ChakraLink
                  w="100%"
                  h="auto"
                  borderRadius=".8rem"
                  href={
                    "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/menu/" +
                    restaurant.menu +
                    ".jpg"
                  }
                  isExternal
                >
                  <Image
                    src={
                      "https://res.cloudinary.com/dtb3ihqfr/image/upload/v1671884469/Foodie/images/restaurants/menu/" +
                      restaurant.menu +
                      ".jpg"
                    }
                    w="100%"
                    h="max-content"
                    borderRadius=".8rem"
                    fallbackSrc={placeholder}
                    alt={restaurant.menu}
                    bgColor="grey"
                    objectFit="scale-up"
                    cursor="pointer"
                    title="Click to enlarge"
                  />
                </ChakraLink>
              </Tooltip>
            </>
          ) : (
            // return nothing if no menu
            <></>
          )}
        </Flex>
      ) : (
        <>
          {exist ? (
            <Flex
              height="80vh"
              justifyContent="center"
              alignItems="center"
              bg={useColorModeValue("gray.50", "gray.800")}
            >
              <CircularProgress
                isIndeterminate
                color="brand.300"
                size="60px"
                thickness="8px"
              />
            </Flex>
          ) : (
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              h="100%"
            >
              <Text as="abbr">Restaurant not found.</Text>
              <Text as="kbd">Error 404</Text>
              <Flex
                mt="2rem"
                flexDir="row"
                gap="1rem"
                flexWrap="wrap"
                justify="center"
              >
                <Button variant="ghost" as="a" href="/">
                  Home
                </Button>
                <Button colorScheme="purple" as="a" href="/Restaurant">
                  Random Restaurant
                </Button>
              </Flex>
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
