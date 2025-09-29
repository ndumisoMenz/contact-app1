import { Container, VStack,Text, SimpleGrid } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useContactStore } from "../store/contact"
import { useEffect } from "react";
import ContactCard from "../components/ContactCard";

const HomePage = () => {
    const{fetchContacts,contacts}=useContactStore();

    useEffect(()=>{
        fetchContacts();
    },[fetchContacts]);
    console.log("contacts",contacts)

  return (
    <Container maxW='container.xl' py={12}>
        <VStack spacing={8}>
            <Text 
            fontSize={"30"}
            fontWeight={"bold"}
            bgGradient={"linear(to-r,cyan.400,blue.500)"}
            bgClip={"text"}
            textAlign={"center"}
            >
                Current Contact
            </Text>

            <SimpleGrid 
                column={
                    {
                        base:1,
                        md:2,
                        lg:3
                    }}
                    spacing={10}
                    w={"full"}
            >
                {contacts.map((contact)=>(
                    <ContactCard key={contact._id} contact={contact} />
                ))}

            </SimpleGrid>

            <Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
                No contacts found 😢{" "}
                <Link to={"/create"}>
                    <Text as='span' color='blue.500' _hover={{textDecoration:"underline"}}>
                     Create a contact
                    </Text>
                </Link>
            </Text>
        </VStack>
    </Container>
  )
}

export default HomePage
