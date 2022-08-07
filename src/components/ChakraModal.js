import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

import React from 'react'

const ChakraModal = ({ isOpen, onOpen, onClose, children, title }) => {
    
    return (
      <>
    
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {children}
            </ModalBody>
  
        
          </ModalContent>
        </Modal>
      </>
    )
  
}

export default ChakraModal