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
  FormHelperText,
} from "@chakra-ui/react";

const EditReview = ({ isOpen, onClose, restaurant }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const limit = 100;
  const [isError, setIsError] = useState(false);

  const wordCounter = (str) => {
    if (!str.trim()) return 0;
    return str.trim().split(/\s+/).length;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (wordCounter(value) > limit) {
      setIsError(true);
      return;
    }
    setComment(value);
    setIsError(false);
  };

  const idRestaurant = window.location.pathname.split("/")[2];

  const checkReview = () => {
    if (!['1', '2', '3', '4', '5'].includes(rating) || comment.trim() === "") {
      setStatus("warning");
      setMessage("Please fill in all fields.");
      return false;
    }
  };

  const handleSubmit = async () => {
    if ((await checkReview()) === false) return;

    else {
      const response = await fetch("/api/review/edit/" + idRestaurant, {
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
      });

      const data = await response.json();

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
        setMessage("You have no review to edit.");
      }
    }
  };

  const deleteReview = () => {
    fetch("/api/review/edit/" + idRestaurant, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + localStorage.getItem("Session Token DO-NOT-SHARE"),
      },
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
          setStatus("info");
          setMessage(data.message);
        }
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Review for {restaurant} (Edit)</ModalHeader>

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
            <Textarea value={comment} onChange={handleChange} />

            {isError === false ? (
              <FormHelperText>
                {wordCounter(comment)} / 100 Words
              </FormHelperText>
            ) : (
              <FormHelperText color="red.500" fontWeight="bold">
                {wordCounter(comment)} / 100 Words
              </FormHelperText>
            )}
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
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>

              <Button colorScheme="green" onClick={handleSubmit}>
                Submit
              </Button>
            </Flex>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditReview;
