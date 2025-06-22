import { Spinner, Text, VStack } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"

const Demo = () => {
  return (
    <VStack colorScheme="teal">
      <Spinner />
      <Text>Loading...</Text>
        <Badge colorScheme="green">Success</Badge>
        <Badge colorScheme="red">Error</Badge>
        <Badge colorScheme="blue">Info</Badge>
        <Badge colorScheme="yellow">Warning</Badge>
    </VStack>
  )
}

export default Demo
