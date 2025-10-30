import {
  Container,
  Heading,
  Box,
  useColorModeValue,
  Input,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useContactStore } from "../store/contact";
import { useAuthStore } from "../store/auth";
import { IContact } from "../types";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate

const CreatePage: React.FC = () => {
  const [newContact, setNewContact] = useState<IContact>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const toast = useToast();
  const navigate = useNavigate(); // ✅ initialize navigate

  const { fetchContacts } = useContactStore();
  const token = useAuthStore((state) => state.token);

  const handleAddContact = async () => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please login to create contacts",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include JWT token
        },
        body: JSON.stringify(newContact),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Error",
          description: data.message || "Failed to create contact",
          status: "error",
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Contact created successfully",
          status: "success",
          isClosable: true,
        });

        setNewContact({ name: "", email: "", phone: "", notes: "" });
        fetchContacts(); // refresh contact list
        navigate("/"); // ✅ navigate to homepage after success
      }
    } catch (err: any) {
      console.error("Error creating contact:", err);
      toast({
        title: "Error",
        description: "Server error. Please try again.",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Contact
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Contact Name"
              value={newContact.name}
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />
            <Input
              placeholder="Email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
            />
            <Input
              placeholder="Phone"
              value={newContact.phone}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
            />
            <Input
              placeholder="Notes"
              value={newContact.notes}
              onChange={(e) =>
                setNewContact({ ...newContact, notes: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddContact} w="full">
              Add Contact
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

