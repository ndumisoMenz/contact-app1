import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box, HStack, IconButton, Input, useColorModeValue, Heading, Text,
  useToast, useDisclosure, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalCloseButton, ModalBody, VStack, ModalFooter, Button
} from '@chakra-ui/react';
import { useContactStore } from '../store/contact';
import { useState } from 'react';
import { IContact } from '../types';

interface ContactCardProps {
  contact: IContact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  const [updatedContact, setUpdatedContact] = useState<IContact>(contact);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteContact, updateContact } = useContactStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteContact = async (cid: string) => {
    const { success, message } = await deleteContact(cid);

    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateContact = async (cid: string, updatedContact: IContact) => {
    onClose();
    await updateContact(cid, updatedContact);
  };

  return (
    <Box shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover={{ transform: "translateY(-5px)", shadow: 'xl' }} bg={bg}>
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>{contact.name}</Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>{contact.email}</Text>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>{contact.phone}</Text>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>{contact.notes}</Text>
        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} aria-label="Edit contact" colorScheme='blue' />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteContact(contact._id!)} colorScheme='red' aria-label="Delete contact" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input placeholder='Contact Name' value={updatedContact.name} onChange={(e) => setUpdatedContact({ ...updatedContact, name: e.target.value })} />
              <Input placeholder='Email' value={updatedContact.email} onChange={(e) => setUpdatedContact({ ...updatedContact, email: e.target.value })} />
              <Input placeholder='Phone' value={updatedContact.phone} onChange={(e) => setUpdatedContact({ ...updatedContact, phone: e.target.value })} />
              <Input placeholder='Notes' value={updatedContact.notes} onChange={(e) => setUpdatedContact({ ...updatedContact, notes: e.target.value })} />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => handleUpdateContact(contact._id!, updatedContact)}>Update</Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContactCard;

