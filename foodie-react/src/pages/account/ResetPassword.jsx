import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Heading,
  AlertIcon,
  Alert,
  AlertTitle,
  Box,
  Badge,
  Tooltip,
  FormHelperText,
  Grid,
  useColorModeValue,
  FormControl,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { AiFillPhone, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import PassInput from "../../components/PassInput";

export default function ResetPassword() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (
      window.location.pathname.split("/")[2] !== "" &&
      window.location.pathname.split("/")[3] !== ""
    ) {
      setUser(window.location.pathname.split("/")[2]);
      setToken(
        window.location.pathname
          .split("/")
          .slice(3)
          .join("/")
          .replace(/\/0$/, "")
      );
      // link will always end with "/0" as sanity check - this "/0" be removed.
      // In a case where token ends with .xxx, the href will misinterpret the last character as a file extension and remove it.
      // Therefore this check is added to prevent the last character of the token from being removed by the href.
    }
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [alertObj, setAlertObj] = useState({ title: null, status: null });
  const showAlert = (title, status, timeout) => {
    setAlertObj({
      title,
      status,
    });

    setTimeout(() => {
      setAlertObj({
        title: null,
        status: null,
      });
    }, timeout * 1000);
  };

  const resetPassword = async (username, phone, email) => {
    if (username === "" || email === "" || phone === "") {
      showAlert("Please fill in all fields", "info", 3);
      return;
    }

    fetch("/api/account/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        phone,
        email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showAlert("Link to reset has been sent to your email!", "success", 3);
        } else {
          showAlert(data.message, data.status, 3);
        }

        setUsername("");
        setPhone("");
        setEmail("");
      });
  };

  const resetPassword2 = async (username, token, password) => {
    fetch("/api/account/resetPassword2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        token,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success === true) {
          setPassword("");
          showAlert(`Password for ${username} has been changed!`, "success", 3);
          setTimeout(() => {
            window.location.href = "/Reset-Password";
          }, 3000);
        } else {
          showAlert(data.message, "error", 3);
        }
      });
  };

  if (user && token.length === 60) {
    return (
      <Grid p="0.8rem">
        {/* back button */}
        <Tooltip label="Go back" aria-label="Go back" placement="left">
          <Button
            as={Link}
            to="/Reset-Password"
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

        <Flex
          flexDir="row"
          boxShadow={useColorModeValue(
            "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
            "0 0 1rem 0 rgba(0, 0, 0, 0.8)"
          )}
          alignItems="center"
          mt="6rem"
          p="1.4rem"
          fontSize="1.2rem"
          borderRadius="1.2rem"
          justifyContent="space-between"
          justifySelf="center"
          flexWrap="wrap"
        >
          <FormControl>
            <Flex flexDir="column" gap=".8rem">
              <Box>Change Password:</Box>
              <PassInput
                placeholder="New Password"
                value={password}
                setValue={setPassword}
              />
              <PassInput
                placeholder="Change Password"
                value={confirmPassword}
                setValue={setConfirmPassword}
              />
              <FormHelperText fontSize="0.8rem">
                Set a secured password of atleast 8 char, that you can remember.
              </FormHelperText>
              <Tooltip
                label={
                  password === "" ||
                  password.length < 8 ||
                  confirmPassword === "" ||
                  password !== confirmPassword
                    ? "Please ensure passwords are matching"
                    : "Change Password"
                }
                hasArrow
              >
                <Button
                  variant="solid"
                  colorScheme="brand"
                  isDisabled={
                    password === "" ||
                    password.length < 8 ||
                    confirmPassword === "" ||
                    password !== confirmPassword
                  }
                  borderRadius="0.6rem"
                  size="lg"
                  width="98%"
                  mt="0.8rem"
                  alignSelf="center"
                  justifySelf="center"
                  onClick={() => resetPassword2(user, token, password)}
                >
                  Reset
                </Button>
              </Tooltip>
            </Flex>
          </FormControl>
        </Flex>

        <Alert
          as={Flex}
          status={alertObj.status === null ? "info" : alertObj.status}
          display={alertObj.title === null ? "none" : "flex"}
          w="max-content"
          m="auto"
          borderRadius="0.6rem"
          justifyContent="center"
          alignItems="center"
          p="0.8rem"
        >
          {alertObj.title}
        </Alert>
      </Grid>
    );
  } else {
    return (
      <>
        <Flex flexDir="column" pt="1.2rem" alignItems="center" gap="0.8rem">
          <Heading pb="1.2rem">Reset Password</Heading>

          <Box h="3rem"> </Box>

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

          <Flex flexDir="column" alignItems="center" gap="0.8rem" width="92%">
            <InputGroup size="md">
              <InputLeftElement children={<AiOutlineUser size="1.2rem" />} />
              <Input
                type="text"
                placeholder="Username"
                variant="filled"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement children={<AiFillPhone size="1.2rem" />} />
              <Input
                pr="4.5rem"
                type="number"
                placeholder="Phone"
                variant="filled"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement children={<AiOutlineMail size="1.2rem" />} />
              <Input
                pr="4.5rem"
                type="email"
                placeholder="Email"
                variant="filled"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <Box h="3rem"> </Box>

            <Badge
              colorScheme="brand"
              borderRadius="0.6rem"
              size="md"
              width="98%"
              p="0.8rem"
              overflow={{ base: "scroll" }}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              An email will be sent to your email address with a link to reset
            </Badge>

            <Button
              onClick={() => {
                resetPassword(username, phone, email);
              }}
              variant="solid"
              colorScheme="brand"
              borderRadius="0.6rem"
              size="lg"
              width="98%"
              mt="0.8rem"
            >
              Reset
            </Button>
          </Flex>
        </Flex>

        {alertObj.title && alertObj.status && (
          <Alert
            as={Flex}
            status={alertObj.status === null ? "info" : alertObj.status}
            display={alertObj.title === null ? "none" : "flex"}
            w="max-content"
            m="auto"
            borderRadius="0.6rem"
            justifyContent="center"
            alignItems="center"
            p="0.8rem"
          >
            <AlertIcon />
            <AlertTitle>{alertObj.title}</AlertTitle>
          </Alert>
        )}
      </>
    );
  }
}
