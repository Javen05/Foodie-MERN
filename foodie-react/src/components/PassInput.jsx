import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IoMdLock } from "react-icons/io";

export default function PassInput({
  placeholder = "Password",
  value,
  setValue,
}) {
  const [show, setShow] = React.useState(false);
  const [fallbackValue, setFallbackValue] = useState("");
  const handleClick = () => setShow(!show);

  const usedValue = value || fallbackValue;
  const usedSetValue = setValue || setFallbackValue;

  return (
    <InputGroup size="md">
      <InputLeftElement children={<IoMdLock size="1.2rem" />} />

      <Input
        value={usedValue}
        pr="4rem"
        onChange={(e) => usedSetValue(e.target.value)}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        variant="filled"
      />

      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? (
            <AiFillEye size="1.2rem" />
          ) : (
            <AiFillEyeInvisible size="1.2rem" />
          )}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
