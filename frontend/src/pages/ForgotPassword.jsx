import { useState } from "react"
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";

import { Box, Button, Container, Heading, Input, Text, VStack, useColorModeValue  } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons'


const ForgotPassword = () => {

  const [ email, setEmail ]   = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotpassword } = useAuthStore();
  
  async function handlesubmit(e) {
   e.preventDefault();
   await forgotpassword(email);
   setIsSubmitted(true);

  };
  const inputBg = useColorModeValue("gray.100", "gray.700");

  return (<>
  <Box>
  {!isSubmitted ? (
  <Container my={50} maxW={"container.sm"} >
        <VStack borderWidth='1px' padding={10} spacing={8} >
            <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' as={"h1"} fontWeight='extrabold' size={"xl"} bgClip='text'textAlign={"center"} mb={2} >
                Lupa password
            </Heading>
            <Text>
              Masukkan Email dan tunggu link reset password dari kami
            </Text>
            <Box w={"full"} rounded={"lg"} shadow={"md"} >
                <VStack spacing={4} >
                    <Input  bg={inputBg}
                    placeholder="Masukkan Email"
                    name="email"
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                      <Button colorScheme="blue" w={"full"} onClick={handlesubmit} type="submit">
                        Submit
                    </Button>
                </VStack>
            </Box>
            <Link to={"/login"} >
                 <Text as='b' _hover={{ textDecoration: "underline" }} fontSize='md'>
                 <ArrowBackIcon mr={1} boxSize={4} />Login
                  </Text>
            </Link>
        </VStack>
  </Container>
    ) : (
      <Container my={200} maxW={"container.sm"} >
                  <VStack borderWidth='1px' padding={10} spacing={8} >
                      <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' as={"h1"} fontWeight='extrabold' size={"xl"} bgClip='text'textAlign={"center"} mb={2} >
                          Lupa password
                      </Heading>
                      <Text>
                        Jika terdapat akun dengan email {email}, anda akan mendapatkan segera link password reset
                      </Text>
                  </VStack>
              </Container>
                    )}
    </Box>
  </>)
}

export default ForgotPassword