import { Grid, GridItem, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import CustomBtn from "../CustomBtn";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logoutUser } from "@/redux/auth.slice";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LogoutModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
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
          Logout
        </Text>
        <Text mt={1.5} textAlign="center">
          Are you sure you want to logout of your account?
        </Text>

        <Grid templateColumns={["1fr", null, "1fr 1fr"]} mt={8} gap={4}>
          <GridItem>
            <CustomBtn light onClick={onClose}>
              No
            </CustomBtn>
          </GridItem>
          <GridItem order={["-1", null, 1]}>
            <CustomBtn onClick={handleLogout}>Yes</CustomBtn>
          </GridItem>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
