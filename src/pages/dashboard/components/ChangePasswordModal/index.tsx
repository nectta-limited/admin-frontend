import { Center, Grid, GridItem, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import CustomBtn from "@/components/CustomBtn";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logoutUser } from "@/redux/auth.slice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent
        mx={[4, 0]}
        maxW="490"
        w="full"
        bg="white"
        borderRadius="6px"
        className="appBox"
        px={[4, 6, 8]}
        py={[6, 6, 8]}
      >
        <Text textAlign="center" fontSize={20} fontWeight={"600"}>
          Password Changed Successfully
        </Text>
        <Text mt={1.5} textAlign="center">
          Your password has been changed successfully. Login with your new password to continue
        </Text>

        <Center mt="8">
          <CustomBtn onClick={handleLogout} maxW={300} w="full">
            Login
          </CustomBtn>
        </Center>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
