import { type FC, useState, useEffect } from "react"
import {
  Box,
  CloseButton,
  Flex,
  Text,
} from "@chakra-ui/react"
import type { Toast } from "./toast-utils"

interface ToasterProps {
  position?: "top" | "bottom"
}

const Toaster: FC<ToasterProps> = ({ position = "top" }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<Toast>
      const toast = customEvent.detail
      setToasts((prev) => [...prev, { ...toast, id: toast.id || Math.random().toString(36).slice(2) }])

      if (toast.duration !== 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id))
        }, toast.duration || 5000)
      }
    }

    window.addEventListener("toast", handleToast)
    return () => window.removeEventListener("toast", handleToast)
  }, [])

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "success":
        return "green.500"
      case "error":
        return "red.500"
      case "warning":
        return "orange.500"
      case "info":
      default:
        return "blue.500"
    }
  }

  return (
    <Box
      position="fixed"
      zIndex={1000}
      top={position === "top" ? "20px" : "auto"}
      bottom={position === "bottom" ? "20px" : "auto"}
      right="20px"
      maxWidth="350px"
      display="flex"
      flexDirection="column"
      gap={2}
    >
      {toasts.map((toast) => (
        <Box
          key={toast.id}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={4}
          borderLeftWidth="4px"
          borderLeftColor={getStatusColor(toast.status)}
          opacity={1}
          transform="translateY(0)"
          transition="all 0.3s ease"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">{toast.title}</Text>
            {toast.closable !== false && (
              <CloseButton 
                size="sm" 
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} 
              />
            )}
          </Flex>
          {toast.description && (
            <Text mt={1} fontSize="sm" color="gray.600">
              {toast.description}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  )
}

export { Toaster }
