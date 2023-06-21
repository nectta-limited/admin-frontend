import { Grid, GridItem, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import CustomBtn from "../CustomBtn";
import { useDeleteBusMutation } from "@/redux/api/buses.api.slice";
import { useDeleteDriverMutation } from "@/redux/api/drivers.api.slice";
import { useDeleteParentMutation } from "@/redux/api/parents.api.slice";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dataType: "bus" | "driver" | "parent";
  id?: number;
};

const DeleteModal = ({ isOpen, onClose, id, dataType }: Props) => {
  const [deleteBus, { isLoading: isLoadingBus, isError: isErrorBus }] = useDeleteBusMutation();
  const [deleteDriver, { isLoading: isLoadingDriver, isError: isErrorDriver }] =
    useDeleteDriverMutation();
  const [deleteParent, { isLoading: isLoadingParent, isError: isErrorParent }] =
    useDeleteParentMutation();

  const handleDelete = async () => {
    if (!id) return;
    try {
      if (dataType === "bus") {
        await deleteBus(id).unwrap();
      }

      if (dataType === "driver") {
        await deleteDriver(id).unwrap();
      }

      if (dataType === "parent") {
        await deleteParent(id).unwrap();
      }

      toast.success("Success");
      onClose();
    } catch (error) {}
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      closeOnOverlayClick={isLoadingBus || isLoadingDriver || isLoadingParent ? false : true}
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
        <Text textAlign="center" fontSize={20} fontWeight={"600"} textTransform="capitalize">
          Delete {dataType}
        </Text>
        <Text mt={1.5} textAlign="center">
          Are you sure you want to delete this {dataType}?
        </Text>

        <Grid templateColumns={["1fr", null, "1fr 1fr"]} mt={8} gap={4}>
          <GridItem>
            <CustomBtn
              light
              onClick={onClose}
              isDisabled={isLoadingBus || isLoadingDriver || isLoadingParent}
            >
              No
            </CustomBtn>
          </GridItem>
          <GridItem order={["-1", null, 1]}>
            <CustomBtn
              onClick={handleDelete}
              isLoading={isLoadingBus || isLoadingDriver || isLoadingParent}
              isError={isErrorBus || isErrorDriver || isErrorParent}
            >
              Yes
            </CustomBtn>
          </GridItem>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default DeleteModal;
