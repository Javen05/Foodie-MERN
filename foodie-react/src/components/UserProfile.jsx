import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  AlertIcon,
  Alert,
  Flex,
} from "@chakra-ui/react";
import { useEffect } from "react";

const UserProfile = ({ isOpen, onClose, account }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const idRestaurant = window.location.pathname.split("/")[2];

  useEffect = () => {
    fetch("/api/review/edit/" + idRestaurant, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
      body: JSON.stringify({
        rating: rating,
        review: comment,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setStatus(data.status);
          setMessage(data.message);

          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1000);
        } else if (data.status === "error") {
          setStatus(data.status);
          setMessage(data.message);
        } else {
          setStatus("warning");
          setMessage("You do not have any reviews to edit.");
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Review for {account} (Edit)</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <FormControl>
            <Input
              type="range"
              min="0"
              max="5"
              cursor="pointer"
              style={{
                background: `linear-gradient(to right, #FFC600 0%, #FFF700 ${
                  rating * 20
                }%, #ccc ${rating * 20}%)`,
              }}
              value={rating}
              onChange={(event) => setRating(event.target.value)}
            />

            {rating > 0 && <FormLabel mt={2}>You rated: {rating}</FormLabel>}
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Comment:</FormLabel>
            <Textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
          </FormControl>
        </ModalBody>

        <Alert status={status ? status : "info"} hidden={message === ""}>
          <AlertIcon />
          {message}
        </Alert>

        <ModalFooter>
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            gap={3}
            justifyContent="space-between"
            width="100%"
          >
            <Button colorScheme="red" onClick={deleteReview}>
              Delete
            </Button>

            <Flex flexWrap="wrap" gap={3}>
              <Button colorScheme="green" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserProfile;
