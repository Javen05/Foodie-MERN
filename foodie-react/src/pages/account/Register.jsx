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
  CloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiFillPhone, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import PassInput from "../../components/PassInput";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [alertObj, setAlertObj] = useState({ title: null, status: null });

  const [count, setCount] = useState(0);

  fetch("/api/account/count", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => setCount(data.count));

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

  const { setToken } = useAuth();

  const submitRegisterForm = async () => {
    if (username === "" || password === "" || email === "" || phone === "") {
      showAlert("Please fill in all fields", "info", 3);
      return;
    } else if (username.length < 3) {
      showAlert("Username must be at least 3 characters", "warning", 3);
      return;
    } else if (!username.match(/^[a-zA-Z0-9]+$/g)) {
      showAlert("Username can only contain letters and numbers", "info", 3);
      return;
    } else if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      showAlert("Invalid Email", "warning", 3);
      return;
    } else if (password.length < 8) {
      showAlert("Password must be at least 8 characters", "warning", 3);
      return;
    } else if (password !== confirmPassword) {
      showAlert("Your Passwords do not match", "warning", 3);
      return;
    } else {
      showAlert("Registering...", "loading", 5);

      const result = await fetch("/api/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          email,
          //convert phone to int
          phone: parseInt(phone),
        }),
      });

      const status = await result.json();
      if (status.success) {
        showAlert("Registration Successful", "success", 4);
        await setToken(status.token);

        setTimeout(() => {
          window.location.href = "/Profile";
        }, 1000);
      } else {
        showAlert(status.message, "error", 3);
      }

      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <Flex flexDir="column" pt="1.2rem" alignItems="center" gap="0.8rem">
        <Heading pb="1.2rem">Register</Heading>

        <Box h="3rem"> </Box>

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
          <PassInput value={password} setValue={setPassword} />
          <PassInput
            placeholder="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
          />

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
            By creating an Account, you agree to our Terms of Service and
            Privacy Policy.
          </Badge>

          <Button
            onClick={() => {
              submitRegisterForm();
            }}
            variant="solid"
            colorScheme="brand"
            borderRadius="0.6rem"
            size="lg"
            width="98%"
            mt="0.8rem"
          >
            Register
          </Button>
        </Flex>

        <br />
        <br />

        <Box
          as={Badge}
          variant="outline"
          colorScheme="purple"
          textTransform="none"
          fontWeight="normal"
          fontSize="1rem"
          borderRadius="0.8rem"
          width="92%"
          p="0.8rem"
          overflow="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          Foodie is a new and growing community that welcome all Users.
          <br />
          Creating an Account is free, so join us now!
          <br />
          <br />
          As of{" "}
          {new Date().toLocaleDateString("en-SG", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}
          ,
          <br />
          There are currently {count} registered Accounts.
        </Box>

        <br />
      </Flex>

      {alertObj.title && alertObj.status && (
        <Alert
          status={alertObj.status}
          position="fixed"
          display="flex"
          flexWrap="wrap"
          left="0"
          right="0"
          bottom="0.8rem"
          margin="auto"
          w="max-content"
          borderRadius="0.6rem"
        >
          <AlertIcon />
          <AlertTitle>{alertObj.title}</AlertTitle>
          <CloseButton onClick={() => setAlertObj({})} />
        </Alert>
      )}
    </>
  );
}
