import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"
import { IoPerson } from "react-icons/io5";


function Navbar() {

    const { colorMode, toggleColorMode } = useColorMode();

    return (<>
    
        <Container maxWidth={"1800px"} px={4} >
            <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexDirection={{
                    base:"column",
                    sm:"row"
            }}
            >
           <Text
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            bgClip='text'
            fontSize={{base: "50", sm: "30"}}
            fontWeight='extrabold'
            >
                <Link to={"/"} >Fastsain </Link>
            </Text>
            <HStack spacing={2} alignItems={"center"}>
                <Link to={"/create"} > 
                <Button>
                    <PlusSquareIcon fontSize={20} />
                </Button>
                </Link>
                <Link to={"/profile"} > 
                <Button>
                    <IoPerson  fontSize={20} />
                </Button>
                </Link>
                <Button onClick={toggleColorMode} >
                    {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                </Button>          
            </HStack>
            </Flex>
        </Container>
        

    </>);
}

export default Navbar;