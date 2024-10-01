import { Box, Button, Container, Heading, Input, InputGroup, InputRightElement, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { ArrowBackIcon } from "@chakra-ui/icons";



function SignUpPage() {
    
    const[newUser, setNewUser] = useState({
        email: "",
        name: "",
        password: ""
    });
    const { signup } = useAuthStore();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handlePassword = () => setShow(!show);
    const toast = useToast();

    function addUserEmail(e) {
        setNewUser(u =>  ({...u, email:e.target.value}));
    };

    function addUserName(e) {
        setNewUser(u =>  ({...u, name:e.target.value}));
    };
    
    function addUserPassword(e) {
        setNewUser(u =>  ({...u, password:e.target.value}));
    };
    

    async function handleSignUp(e) {
        e.preventDefault();

        const { email, name, password } = newUser;

        const isEmailEmpty = newUser.email.trim() === "";
        const isNameEmpty = newUser.name.trim() === "";
        const isPasswordEmpty = newUser.password.trim() === "";
    
        if (isNameEmpty || isEmailEmpty || isPasswordEmpty) {
            toast({
                title: 'Error',
                description: 'Isi semua form',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return; 
        }
        try {
            await signup(email, name, password);
            navigate("/verify-email");
            toast({
                title: 'Success',
                description: "Sign up Berhasil",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } catch (error) {
            console.log(error);
            toast({
            title: 'Signup Gagal',
            description: error.message || 'There was an error during signup. Please try again.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            });
        }
    };
    
    return ( <>
    <Container maxW={"container.sm"} my={20}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8}>
                Sign up
            </Heading>
            <Box h='100%' w='80%' rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input bg={useColorModeValue("gray.100", "gray.700")} 
                    placeholder="Masukkan Email"
                    name="email"
                    value={newUser.email || ""}
                    onChange={addUserEmail}
                    />
                    <Input bg={useColorModeValue("gray.100", "gray.700")} 
                    placeholder="Masukkan nama"
                    name="name"
                    value={newUser.name || ""}
                    onChange={addUserName}
                    />
                    <InputGroup size='md' bg={useColorModeValue("gray.100", "gray.700")} >
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Masukkan Password'
                        value={newUser.password || ""}
                        name="password"
                        onChange={addUserPassword}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePassword}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    <Button _hover={{ transform: "translateY(-2px)", shadow: "xl" }}  colorScheme="blue" onClick={handleSignUp} w={"full"}>
                        Sign Up
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
    </> );
}

export default SignUpPage;