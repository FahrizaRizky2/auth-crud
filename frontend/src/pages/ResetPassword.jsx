import { Box, Button, Container, Heading, Input, InputGroup, InputRightElement, VStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react"
import { useAuthStore } from "../store/auth";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {

    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const { resetpassword } = useAuthStore();

    const { token }= useParams();
    const navigate = useNavigate();
    const toast = useToast();
    
    async function handleSubmit(e) {
        e.preventDefault();

        const isPasswordEmpty = password.trim() === "";
        const isPassword2Empty = password2.trim() === "";

        if (isPasswordEmpty || isPassword2Empty) {
            toast({
                title: 'Error',
                description: 'Isi Semua Form',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return; 
        }
        else if(password !== password2){
            toast({
                title: 'Error',
                description: 'Password Tidak Sama',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return;
        }
        try {
            await resetpassword(password, token);
            toast({
                title: 'Suksess',
                description: "Password Berhasil di Reset",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Password gagal di reset',
                description: error.message || 'There was an error during reset password. Please try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    }
    const [show, setShow] = useState(false);
    const handlePassword = () => setShow(!show);

    const [showConfirm, setShowConfirm] = useState(false);
    const handlePasswordConfirm = () => setShowConfirm(!showConfirm);

  return (
    <Container my={50} maxW={"container.sm"} >
        <VStack borderWidth='1px' padding={10} spacing={8} >
            <Heading bgGradient='linear(to-l, #7928CA, #FF0080)' as={"h1"} fontWeight='extrabold' size={"xl"} bgClip='text'textAlign={"center"} mb={2} >
                Reset password
            </Heading>
            <Box w={"full"} rounded={"lg"} shadow={"md"} >
                <VStack spacing={4} >
                <InputGroup size='md' bg={useColorModeValue("gray.100", "gray.700")} >
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Masukkan Password'
                        value={password || ""}
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePassword}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <InputGroup size='md' bg={useColorModeValue("gray.100", "gray.700")} >
                    <Input
                        pr='4.5rem'
                        type={showConfirm ? 'text' : 'password'}
                        placeholder='Masukkan Password'
                        value={password2 || ""}
                        name="password2"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePasswordConfirm}>
                        {showConfirm ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                      <Button colorScheme="blue" w={"full"} type="submit" onClick={handleSubmit}>
                        Buat Password Baru
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
  )
}

export default ResetPassword