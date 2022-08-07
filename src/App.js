import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Image, Input, InputGroup, InputLeftElement, Stack, useDisclosure,} from "@chakra-ui/react";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactCard from "./components/ContactCard";
import React, { useEffect, useState } from "react";
import ChakraModal from "./components/ChakraModal";
import ContactForm from "./components/ContactForm";
import { v4 as uuidv4 } from 'uuid';
import { addContactOnServer, deleteContactOnServer, getAllContacts, updateContactOnServer
} from "./network";
import { Link } from "react-router-dom";
import { deleteDoc, doc} from "@firebase/firestore";

const App = () => {


  const {isOpen,onOpen, onClose}= useDisclosure();



  const { isOpen:isOpenNew, 
    onOpen:onOpenNew,
     onClose:onCloseNew } = useDisclosure();

     const [searchData, setSearchData]= useState("");
const [contacts, setContacts] = useState([]);

const[contactId, SetContactId] = useState();

useEffect(() => {
  const fetchContacts = async () => {
    const data = await getAllContacts();
    const    tempArray = [];

   
    if (data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        tempArray.push({ id: key, name: value.name, mobile: value.mobile });
      });}
    
      
console.log(tempArray);
    setContacts(tempArray);
  };
  fetchContacts();
}, []);


const addNewContact = async (name, mobile) =>{
if(contacts.findIndex((contact) => contact.mobile === mobile) === -1 && mobile !== ""){

  const data = await addContactOnServer (name, mobile )
  console.log(data);
  setContacts([...contacts,{name,mobile, id:data.name}])}
}


let searchContacts = contacts.filter((contact)=> contact.name?.includes(searchData));

const getContactId =(id) =>{
SetContactId(id);
};
 
const updateContact = async (name, mobile, id ) =>{
  const data = await updateContactOnServer(name, mobile,id);
  console.log(data);

  setContacts((prev)=> [...contacts.filter((contact)=> contact.id !== id),
    {name: data.name, mobile: data.mobile, id}
  ])
}
const deleteContact = async (id) => {
  const data = await deleteContactOnServer(id);
  console.log(data);

if (data === null){
  setContacts((prev) => [
    ...contacts.filter((contact) => contact.id !== id),
  ]);

}
    
      
  }
;
  

let selectContact = contacts.find((contact) =>contact.id === contactId);


  return(
  <>
  <ChakraModal isOpen={isOpen} title={"Add New Contact"} onOpen={onOpen} onClose={onClose}>
    {<>
    <ContactForm addNewContact={addNewContact} onClose={onClose} />
      

    </>}
   </ChakraModal>

   <ChakraModal
   
    isOpen={isOpenNew} 
   title={"Add New Contact"} 
   onOpen={onOpenNew} 
   onClose={onCloseNew}>
    {<>
    <ContactForm contact={selectContact} addNewContact={addNewContact} onClose={onCloseNew} updateContact={updateContact} 
    />
      

    </>}
   </ChakraModal>
  <Box>
  <Flex p="4"justify="center"align="center">
    <Image src= "https://icon-library.com/images/contact-list-icon/contact-list-icon-22.jpg" w="150px" h="100px" 
    >

    </Image>
    <Heading as="h1" text-trasnsform= "uppercase">Contact List </Heading>

  </Flex>
  <Box p="4">
    <Button bg="green.700"
     w="full"
      fontSize="xl"
       fontWidth="bold"
       color="white"
       colorScheme="green"
       onClick={onOpen}>
     <AddIcon h="20px" w="20px" mr="4"/> ADD CONTACT
    </Button>
  </Box>
<Box>
<InputGroup>
    <InputLeftElement
      pointerEvents='none'
      children={<SearchIcon color='gray.300' />}

    />
    <Input 
    focusBorderColor="green"
    type='text' 
    placeholder='Search Contact' 
    onChange={(e) => setSearchData(e.target.value)}/>
  </InputGroup>
</Box>
<Box p="4">
  {searchContacts.map((contact )=>(
   
  
     <ContactCard 
    onOpen={onOpenNew} 
    contact={contact}
     key={contact.id}
     getContactId={getContactId}
     deleteContact={deleteContact}/>


  ))}
</Box>
  </Box>
  </>
  )
};


export default App;
