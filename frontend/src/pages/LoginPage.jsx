import { Box, Button, Container, Heading, Input, InputGroup, InputRightElement, Text, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { Loader } from "lucide-react";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";


const LoginPage = () => {

  const [newLogin, setNewLogin] = useState({
    email:"",
    password:""
  });
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const toast = useToast();

  function addUserEmail(e) {
    setNewLogin(l => ({...l, email:e.target.value}));
  };

  function addUserPassword(e) {
    setNewLogin(l => ({...l, password:e.target.value}));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const {email, password} = newLogin;

    const isEmailEmpty = newLogin.email.trim() === "";
    const isPasswordEmpty = newLogin.password.trim() === "";

    if (isEmailEmpty || isPasswordEmpty) {
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
        await login(email, password);
        navigate("/");
        toast({
            title: 'Success',
            description: "Login Berhasil",
            status: 'success',
            duration: 4000,
            isClosable: true,
        });
    } catch (error) {
        console.log(error);
        toast({
        title: 'Login Gagal',
        description: error.message || 'There was an error during login. Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
        });
    }
  };

  const [show, setShow] = useState(false);
  const handlePassword = () => setShow(!show);
  const isLoading = false;

  return (<>
    <Container maxW={"container.sm"} my={20}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8} >
          Login
        </Heading>
        <Box h='100%' w='80%' rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
          <Input bg={useColorModeValue("gray.100", "gray.700")} 
                    placeholder="Masukkan Email"
                    name="email"
                    value={newLogin.email || ""}
                    onChange={addUserEmail}
                    />
          <InputGroup size='md' bg={useColorModeValue("gray.100", "gray.700")} >
              <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Masukkan Password'
                        value={newLogin.password || ""}
                        name="password"
                        onChange={addUserPassword}
              />
              <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handlePassword}>
                        {show ? 'Hide' : 'Show'}
                        </Button>
              </InputRightElement>
            </InputGroup>
          </VStack>
        </Box>
        <Box w='80%' rounded={"lg"}>
        <VStack my={1} spacing={8}>
        <Link to={"/forgot-password"} >
          <Text textAlign={"left"} as='b' _hover={{ textDecoration: "underline" }} fontSize='md'>
                        Lupa Password?
          </Text>
          </Link>
            <Button disabled={isLoading} my={1} _hover={{ transform: "translateY(-2px)", shadow: "xl" }}  colorScheme="blue" onClick={handleLogin} w={"full"}>
                          {isLoading ? <Loader  /> : "login"}
            </Button> 
          <Link to={"/signup"} >
            <Text textAlign={"left"} as='b' _hover={{ textDecoration: "underline" }} fontSize='md'> 
              Bikin akun
            </Text>
          </Link>
        </VStack>
        </Box>
      </VStack>
    </Container>




    </> )
}

export default LoginPage