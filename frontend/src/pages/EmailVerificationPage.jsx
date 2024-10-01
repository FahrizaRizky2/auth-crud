import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, HStack, Input, SimpleGrid, useToast } from "@chakra-ui/react";
import { Form, Formik } from 'formik'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from "../store/auth";

const EmailVerificationPage = () => {

    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { verifyEmail } = useAuthStore();

    const handleChange = (index, value) => {
      const newCode = [...code];

      //handle pasted content
      if (value.length > 1) {
        const pastedCode = value.slice(0, 6).split("");
        for (let i = 0; i < 6; i++) {
          newCode[i] = pastedCode[i] || "";
        }
        setCode(newCode);

        //focus on the last non-empty or the first empty one
        const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
        
      } else {
        newCode[index] = value;
        setCode(newCode);

        //move focus to the next input field if value is entered
        if (value && index < 5) {
          inputRefs.current[index + 1].focus();
        }
      }

    };

    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    };

    const toast = useToast();

    async function handleSubmit(e) {
      e.preventDefault();
      const verificationCode = code.join("");

      try {
        await verifyEmail(verificationCode);
        navigate("/");
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
            title: 'Code Invalid',
            description: error.message || 'There was an error during signup. Please try again.',
            status: 'error',
            duration: 4000,
            isClosable: true,
            });
      }
     
    };

    //auto submit when all fields are filled
    useEffect(() => {
      if (code.every((digit) => digit !== "")) {
        handleSubmit(new Event('submit'))
      }
    },[code]
  );

    
  return (
<Box height="100vh" display="flex" justifyContent="center" alignItems="center">
  <SimpleGrid align={'center'} spacing={4} w={['90%', '70%', '50%', '30%']} >
    <Formik onSubmit={handleSubmit}>
      <Form>
    <Card align={'center'} w="100%" >
      <CardHeader>
        <Heading size='md'>Enter Verification Code</Heading>
      </CardHeader>
      <CardBody>
        <HStack justify="center" spacing={2} w="100%">
           {code.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              maxLength={6}
              type="number"
              textAlign="center"
              size="md"
              width="3rem"
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </HStack>
      </CardBody>
      <CardFooter>
        <Button>Verify Email</Button>
      </CardFooter>
    </Card>
    </Form>
    </Formik>
  </SimpleGrid>
</Box>
  
  )
}

export default EmailVerificationPage