import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { useEffect } from "react";
import noProfile from "../assets/images/defUser.png";

const ReviewProfile = ({ isOpen, onClose }) => {
  const [ratio, setRatio] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(isOpen);

    fetch("/api/upvote/me/" + username, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRatio(data[0]);
      });
  }, [username, isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{ratio ? ratio.username : "An Error Occured"}</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          {ratio ? (
            ratio.ratio ? (
              <Flex
                flexDirection="column"
                flexWrap="wrap"
                gap={3}
                justifyContent="center"
                alignItems="center"
              >
                <Avatar
                  name={
                    ratio.username
                      ? ratio.username.replace(
                          ratio.username[ratio.username.length - 2],
                          " "
                        )
                      : ""
                  }
                  src={ratio.username ? <></> : noProfile}
                  size="2xl"
                  borderRadius="0.8rem"
                  marginBottom="0.8rem"
                  _hover={{
                    opacity: "0.9",
                    boxShadow: "inset 0 0 1rem 0 rgba(0, 0, 0, 0.15)",
                    cursor: "pointer",
                  }}
                />

                <Box fontSize=".8rem">Created on {ratio.date}</Box>
                <Flex gap=".3rem">
                  Upvotes Ratio: <Box fontWeight="bold">{ratio.ratio}</Box>
                </Flex>
              </Flex>
            ) : (
              <Box>
                <b>{username}</b> does not have any statistics.
              </Box>
            )
          ) : (
            <></>
          )}
        </ModalBody>

        <ModalFooter>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            gap={3}
            justifyContent="right"
            width="100%"
          >
            <Button onClick={onClose}>Close</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewProfile;
