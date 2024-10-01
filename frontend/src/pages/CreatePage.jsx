import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack   } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";


function CreatePage() {
    
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });


    function addProductName(e) {
        setNewProduct(n => ({...n, name:e.target.value}));
    }
    function addProductPrice(e) {
        setNewProduct(n => ({...n, price:e.target.value}));
    }
    function addProductImage(e) {
        setNewProduct(n => ({...n, image:e.target.value}));
    }
    
    const { createProduct } = useProductStore();
    const toast = useToast();
    const inputBg = useColorModeValue("gray.100", "gray.700");
    
    async function handleAddProduct() {

        const isNameEmpty = newProduct.name.trim() === "";
        const isPriceEmpty = newProduct.price.trim() === "";
        const isImageEmpty = newProduct.image.trim() === "";
    
        if (isNameEmpty || isPriceEmpty || isImageEmpty) {
            toast({
                title: 'Error',
                description: 'Isi semua form',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            return; 
        }
    
        const { success, message } = await createProduct(newProduct);
    
        setNewProduct({
            name: isNameEmpty ? newProduct.name : "", 
            price: isPriceEmpty ? newProduct.price : "", 
            image: isImageEmpty ? newProduct.image : "" 
        });
    
        if (!success) {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    return (<>
    <Container maxW={"container.sm"} >
        <VStack spacing={8} >
            <Heading as={"h1"} size={"xl"} textAlign={"center"} mb={8} >
                Create New Product
            </Heading>
            <Box w={"full"} rounded={"lg"} shadow={"md"} >
                <VStack spacing={4} >
                    <Input  
                    bg={inputBg}
                    placeholder="Product Name"
                    name="name"
                    value={newProduct.name || ""}
                    onChange={addProductName}
                    />
                    <Input  
                    bg={inputBg}
                    placeholder="Product Price"
                    name="price"
                    value={newProduct.price || ""}
                    onChange={addProductPrice}
                    type="number"
                    />
                    <Input  
                    bg={inputBg}
                    placeholder="Product Image"
                    name="image"
                    value={newProduct.image || ""}
                    onChange={addProductImage}
                    />
                    <Button colorScheme="blue" onClick={handleAddProduct} w={"full"} >
                        Tambah Produk
                    </Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
        
        

        </>);
}

export default CreatePage;