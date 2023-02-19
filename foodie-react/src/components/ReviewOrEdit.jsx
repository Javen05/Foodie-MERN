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
  FormHelperText,
} from "@chakra-ui/react";

//isOpen stores the Restaurant's ID
const ReviewOrEdit = ({ isOpen, onClose, restaurant }) => {
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

  const checkReview = () => {
    if (!['1', '2', '3', '4', '5'].includes(rating) || comment.trim() === "") {
      setStatus("warning");
      setMessage("Please fill in all fields.");
      return false;
    }
  };

  const handleSubmit = () => {
    if (checkReview() === false) return;

    else {
      fetch("/api/review/edit/" + isOpen, {
        method: "POST",
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

            fetch("/api/list/bookmarks", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer " +
                  localStorage.getItem("Session Token DO-NOT-SHARE"),
              },
              body: JSON.stringify({
                idRestaurant: isOpen,
              }),
            })
              .then((response) => response.json())
              .then((result) => {
                setStatus(result.status);
                setMessage(result.message);
              });

            setTimeout(() => {
              onClose && onClose();
            }, 800);

            setTimeout(() => {
              window.location.reload();
            }, 1200);

          } else if (data.code === "ER_DUP_ENTRY") {
            fetch("/api/review/edit/" + isOpen, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer " +
                  localStorage.getItem("Session Token DO-NOT-SHARE"),
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

                  fetch("/api/list/bookmarks", {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization:
                        "Bearer " +
                        localStorage.getItem("Session Token DO-NOT-SHARE"),
                    },
                    body: JSON.stringify({
                      idRestaurant: isOpen,
                    }),
                  })
                    .then((response) => response.json())
                    .then((result) => {
                      setStatus(result.status);
                      setMessage(result.message);
                    });

                  setTimeout(() => {
                    onClose && onClose();
                  }, 800);

                  setTimeout(() => {
                    window.location.reload();
                  }, 1200);
                }
              });

          } else {
            setStatus(data.status);
            setMessage(data.message);
          }
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Review for {restaurant}</ModalHeader>

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
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="green" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewOrEdit;
