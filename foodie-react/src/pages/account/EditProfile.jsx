import {
  Alert,
  Box,
  Button,
  Flex,
  Grid,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Progress,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import PassInput from "../../components/PassInput";
import { IoMdArrowRoundBack, IoMdArrowRoundDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaCopy } from "react-icons/fa";

export default function EditProfile() {
  const { user } = useAuth();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [oldUsername, setOldUsername] = useState("");

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

  const deleteAccount = async () => {
    const result = await fetch("/api/account/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        username: oldUsername,
        password: currentPassword,
      }),
    });

    const data = await result.json();

    if (data.success === true) {
      showAlert(data.message, "success", 3);
      localStorage.removeItem("Session Token DO-NOT-SHARE");
      window.location.href = "/";
      window.location.reload();
    } else {
      showAlert(data.message, "error", 3);
      setCurrentPassword("");
    }
  };

  const editProfile = async () => {
    const result = await fetch("/api/account/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        idAccount: user.idAccount,

        username: user.username,
        newUsername: username,

        password: currentPassword,
        newPassword: password,

        email: email,
        phone: phone,
      }),
    });

    const data = await result.json();

    if (data.success === false) {
      showAlert(data.message, "error", 3);
      setPassword("");
      setCurrentPassword("");
    } else {
      showAlert(data.message, "success", 3);
      window.location.reload();
    }
  };

  return (
    <Grid p="0.8rem">
      <Flex
        flexDir="row"
        boxShadow={useColorModeValue(
          "0 0 1rem 0 rgba(0, 0, 0, 0.1)",
          "0 0 1rem 0 rgba(0, 0, 0, 0.8)"
        )}
        alignItems="center"
        mt="6rem"
        w="max-content"
        p="1.4rem"
        fontSize="1.2rem"
        borderRadius="1.2rem"
        justifyContent="space-between"
        justifySelf="center"
        flexWrap="wrap"
      >
        <Flex flexDir="column" gap=".6rem">
          <Tooltip label="Go back" aria-label="Go back" placement="left">
            <Button
              as={Link}
              to="/Profile"
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

          <Box fontSize="1.5rem" mt="0.2rem">
            <b>{user ? user.username : "No Profile found"}</b>{" "}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setUsername(user.username);
              }}
            >
              <Icon as={FaCopy} />
            </Button>
            <Input
              type="text"
              placeholder="New Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Box>

          <Box>
            {user ? user.email : "****@*****.***"}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setEmail(user.email);
              }}
            >
              <Icon as={FaCopy} />
            </Button>
          </Box>

          <Input
            type="text"
            placeholder="New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Box>
            +65 <em>{user ? user.phone : "**** ****"}</em>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setPhone(user.phone);
              }}
            >
              <Icon as={FaCopy} />
            </Button>
          </Box>

          <Input
            type="number"
            placeholder="New Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Box>Change Password:</Box>

          <PassInput
            placeholder="New Password"
            value={password}
            setValue={setPassword}
          />

          <Box>Verify Authority:</Box>

          <PassInput
            placeholder="Verify Password"
            value={currentPassword}
            setValue={setCurrentPassword}
          />

          <Tooltip
            label={
              username === "" ||
              phone === "" ||
              email === "" ||
              password === "" ||
              currentPassword === ""
                ? "Please fill in all the fields"
                : "Submit"
            }
            hasArrow
          >
            <Button
              variant="ghost"
              colorScheme="brand"
              isDisabled={
                username === "" ||
                phone === "" ||
                email === "" ||
                password === "" ||
                currentPassword === ""
              }
              borderRadius="0.6rem"
              size="lg"
              width="90%"
              mt="0.8rem"
              alignSelf="center"
              justifySelf="center"
              onClick={() => editProfile()}
            >
              Submit
            </Button>
          </Tooltip>
        </Flex>
      </Flex>

      <Alert
        as={Flex}
        status={alertObj.status === null ? "info" : alertObj.status}
        display={alertObj.title}
        w="max-content"
        pos="absolute"
        top="10rem"
        left="0"
        right="0"
        m="auto"
        borderRadius="0.6rem"
        justifyContent="center"
        alignItems="center"
        p="0.8rem"
      >
        {alertObj.title === null ? <b>Edit Profile</b> : alertObj.title}
      </Alert>

      <Icon
        as={IoMdArrowRoundDown}
        boxSize="20px"
        m="auto"
        mt="2.4rem"
        _hover={{
          cursor: "pointer",
          transform: "scale(1.2)",
          transition: "all 0.2s ease-in-out",
        }}
      />

      <Progress
        size="xs"
        hasStripe
        value="100"
        colorScheme="red"
        mt="1.8rem"
        h="2rem"
      />

      <Flex flexDir="column" alignItems="center" mt="2.4rem" mb="2.4rem">
        <Box fontSize="1.2rem" mb="0.8rem">
          <b>Delete Account</b>
        </Box>
        <em>Permanently delete your account forever.</em>
        This action is irreversible.
        <Popover isLazy={true}>
          <PopoverTrigger>
            <Button
              variant="ghost"
              colorScheme="red"
              borderRadius="0.6rem"
              size="lg"
              width="20rem"
              mt="0.8rem"
              alignSelf="center"
              justifySelf="center"
            >
              Delete Account
            </Button>
          </PopoverTrigger>

          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <b>Confirmation:</b>
            </PopoverHeader>
            <PopoverBody>
              <Input
                mb=".6rem"
                type="text"
                placeholder="Enter your username"
                value={oldUsername}
                onChange={(e) => setOldUsername(e.target.value)}
              />

              <PassInput
                placeholder="Enter your password"
                value={currentPassword}
                setValue={setCurrentPassword}
              />
              <Button
                variant="ghost"
                colorScheme="red"
                borderRadius="0.6rem"
                size="md"
                w="100%"
                mt="0.8rem"
                mb="0.2rem"
                alignSelf="center"
                justifySelf="center"
                isDisabled={oldUsername === "" || currentPassword === ""}
                onClick={() => deleteAccount()}
              >
                Delete Account
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Alert
          as={Flex}
          status={alertObj.status === null ? "info" : alertObj.status}
          display={alertObj.title === null ? "none" : "flex"}
          w="max-content"
          pos="fixed"
          top="1rem"
          zIndex="1000"
          left="0"
          right="0"
          m="auto"
          borderRadius="0.6rem"
          justifyContent="center"
          alignItems="center"
          p="0.8rem"
        >
          {alertObj.title}
        </Alert>
      </Flex>
    </Grid>
  );
}
