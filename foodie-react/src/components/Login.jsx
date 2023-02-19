import {
  Alert,
  AlertIcon,
  AlertTitle,
  Avatar,
  Button,
  DarkMode,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import PassInput from "./PassInput";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [popupShown, setPopupShown] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [alertObj, setAlertObj] = useState({ title: null, status: null });

  const showAlert = (title, status) => {
    setAlertObj({
      title,
      status,
    });

    setTimeout(() => {
      setAlertObj({
        title: null,
        status: null,
      });
    }, 3 * 1000);
  };

  const logout = () => {
    setToken(null);
    showAlert("Logged out", "info");
    setPopupShown(!popupShown);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const { user, setToken } = useAuth();

  const submitLoginForm = async () => {
    const result = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    //clear password input box
    setPassword("");

    const data = await result.json();
    if (data.success) {
      const user = data.user;
      setToken(data.token);
      showAlert(`Welcome back, ${user.username}!`, "success");
      setPopupShown(!popupShown);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else {
      showAlert("Login Failed", "error");
    }
  };

  return (
    <>
      <DarkMode>
        <Tooltip label="Account" placement="bottom">
          <Button
            variant="ghost"
            p="0"
            onClick={() => setPopupShown(!popupShown)}
          >
            {!user ? (
              <MdAccountBox fill="var(--chakra-colors-brand-50)" size="40px" />
            ) : user.username ? (
              <Avatar
                size="sm"
                name={user.username.replace(
                  user.username[user.username.length - 2],
                  " "
                )}
                borderRadius="20%"
              />
            ) : (
              <Avatar size="sm" borderRadius="20%" />
            )}
          </Button>
        </Tooltip>
      </DarkMode>

      {popupShown &&
        (!user ? (
          <Flex
            flexDir="column"
            position="absolute"
            bottom="0"
            right="0"
            p="4"
            bgColor="brand.200"
            borderRadius="0 0 1.2rem 1.2rem"
            borderWidth="0.3rem"
            borderColor="brand.300"
            alignItems="center"
            width={window.innerWidth < 768 ? "100%" : "auto"}
            sx={{
              transform: "translateY(100%)",
              zIndex: 101,
            }}
          >
            <form onSubmit={submitLoginForm} action="javascript:void(0)">
              <Flex flexDirection="column" gap="0.6rem" alignItems="center">
                <DarkMode>
                  <InputGroup size="md" marginBottom="0.6rem">
                    <InputLeftElement
                      children={<AiOutlineUser size="1.2rem" />}
                    />
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      placeholder="Username"
                      variant="filled"
                    />
                  </InputGroup>
                  <PassInput value={password} setValue={setPassword} />
                </DarkMode>
                <Button
                  type="submit"
                  marginTop="0.6rem"
                  w="98%"
                  variant="solid"
                  colorScheme="blue"
                  color="brand.50"
                  onClick={() => {
                    submitLoginForm();
                  }}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/Register"
                  _hover={{ textDecoration: "none" }}
                  w="98%"
                  variant="outline"
                  colorScheme="brand.600"
                  bg="brand.200"
                  color="brand.50"
                  onClick={() => setPopupShown(!popupShown)}
                >
                  <Flex h="100%" align="center" justify="center">
                    Register
                  </Flex>
                </Button>
                <Link to="/Reset-Password">
                  <Text
                    fontSize="0.8rem"
                    color="brand.50"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Forgot Password
                  </Text>
                </Link>
              </Flex>
            </form>
          </Flex>
        ) : (
          <Flex
            flexDirection="column"
            gap="0.8rem"
            position="absolute"
            bottom="0"
            right="0"
            p="4"
            bgColor="brand.200"
            borderRadius="0 0 1.2rem 1.2rem"
            borderWidth="0.3rem"
            borderColor="brand.300"
            alignItems="center"
            width={window.innerWidth < 768 ? "100%" : "auto"}
            sx={{
              transform: "translateY(100%)",
              zIndex: 101,
            }}
          >
            <DarkMode>
              <Link
                w="98%"
                to="/Profile"
                _hover={{ textDecoration: "none" }}
              >
                <Button
                  w="100%"
                  variant="outline"
                  colorScheme="brand.600"
                  bg="brand.200"
                  color="brand.50"
                >
                  <Flex>
                    <h3>Profile</h3>
                  </Flex>
                </Button>
              </Link>

              <Button
                w="98%"
                variant="outline"
                colorScheme="brand.600"
                bg="brand.200"
                color="brand.50"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </DarkMode>
          </Flex>
        ))}

      {alertObj.title && alertObj.status && (
        <Alert
          status={alertObj.status}
          variant="solid"
          borderRadius="1.2rem"
          position="fixed"
          display="flex"
          flexWrap="wrap"
          left="0"
          right="0"
          margin="auto"
          bottom="0.8rem"
          w="max-content"
        >
          <AlertIcon />
          <AlertTitle>{alertObj.title}</AlertTitle>
        </Alert>
      )}
    </>
  );
}
