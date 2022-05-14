import React from 'react'

export default function AlertDialog({ heading_text, body_text }) {
  const { isOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {heading_text}
          </AlertDialogHeader>

          <AlertDialogBody>{body_text}</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="teal" onClick={onClose} ml={3}>
              確認
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
