import { useColorMode, DarkMode, Tooltip, Box, Button } from "@chakra-ui/react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";

export default function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header>
      <Tooltip
        label={`${colorMode === "light" ? "Dark" : "Light"} Mode`}
        placement="bottom"
      >
        <Box>
          <DarkMode>
            <Button p="0" onClick={() => toggleColorMode()}>
              {colorMode === "light" ? (
                <IoMdMoon fill="white" size="20px" />
              ) : (
                <IoMdSunny size="20px" />
              )}
            </Button>
          </DarkMode>
        </Box>
      </Tooltip>
    </header>
  );
}
