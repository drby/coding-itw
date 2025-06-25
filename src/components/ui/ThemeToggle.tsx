import { type FC } from "react"

import { useTheme } from "next-themes"
import { IconButton, Box } from "@chakra-ui/react"
import { IoMoon, IoSunny } from "react-icons/io5"

export const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const isDark = resolvedTheme === "dark"

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <Box title={isDark ? "Mode clair" : "Mode sombre"}>
      <IconButton
        aria-label={isDark ? "Passer au mode clair" : "Passer au mode sombre"}
        onClick={handleToggle}
        variant="ghost"
        size="md"
        borderRadius="md"
      >
        {isDark ? <IoSunny /> : <IoMoon />}
      </IconButton>
    </Box>
  )
}
