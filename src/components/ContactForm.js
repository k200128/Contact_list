import { Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ContactForm = ({addNewContact, onClose, contact, updateContact}) => {

const[name, setName]= useState(contact ? contact.name:"" );
const[mobile, setMobile]= useState(contact ? contact.mobile:"");

const onSubmit = () =>{
    if (contact){
updateContact(name, mobile, contact.id);
onClose();
    }
    else{
        addNewContact(name, mobile);
        onClose();
    }

}

  return (
    <Stack>
    <FormControl id="name">
  <FormLabel>Name</FormLabel>
  <Input value={ name} 
  type='text' 
  onChange={(e) => setName(e.target.value)}/>
</FormControl>

<FormControl id="mobile">
  <FormLabel>Mobile</FormLabel>
  <Input value={mobile } 
  type='number'
   onChange={(e) => setMobile(e.target.value)} />
</FormControl>
{contact ? 
    <Button  onClick={onSubmit}colorScheme="green"alignSelf="flex-end">Update Contact</Button>:

<Button  onClick={onSubmit}colorScheme="green"alignSelf="flex-end">Add Contact</Button>}
    </Stack>
  )
}

export default ContactForm