import { Container, Heading,Box, useColorModeValue,Input, VStack, Button, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useContactStore } from "../store/contact"

const CreatePage = () => {
    const[newContact,setNewContact]=useState({
        name:"",
        email:"",
        phone:"",
        notes:"",
    })

    const toast=useToast()
    const {createContact}=useContactStore();

    const handleAddContact=async()=>{
        const{success,message}=await createContact(newContact);
        if(!success){
            toast({
                title:"Error",
                description:message,
                status:"error",
                isClosable:true
            })
        }else{
            toast({
                title:"Success",
                description:message,
                status:"success",
                isClosable:true,
            })
        }
        setNewContact({name:"",email:"",phone:"",notes:""})
    }

  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Contact
            </Heading>
            <Box
                w={"full"} bg={useColorModeValue("white","gray.800")} 
                p={6} rounded={"lg"} shadow={"md"} >
                    <VStack spacing={4}>
                        <Input placeholder='Contant Name' name='name' value={newContact.name} 
                        onChange={(e)=>setNewContact({...newContact,name:e.target.value})}/>

                        <Input placeholder='Email' name='name' value={newContact.email} 
                        onChange={(e)=>setNewContact({...newContact,email:e.target.value})}/>

                        <Input placeholder='Phone' name='name' value={newContact.phone} 
                        onChange={(e)=>setNewContact({...newContact,phone:e.target.value})}/>

                        <Input placeholder='Notes' name='name' value={newContact.notes} 
                        onChange={(e)=>setNewContact({...newContact,notes:e.target.value})}/>

                        <Button colorScheme="blue" onClick={handleAddContact} w='full'>
                            Add Contact
                        </Button>
                        
                    </VStack>

            </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage
