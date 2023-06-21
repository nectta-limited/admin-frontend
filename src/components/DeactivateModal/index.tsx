import { Grid, GridItem, Modal, ModalContent, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import CustomBtn from "../CustomBtn";
import { useActivateBusMutation, useDeactivateBusMutation } from "@/redux/api/buses.api.slice";
import {
  useActivateDriverMutation,
  useDeactivateDriverMutation,
} from "@/redux/api/drivers.api.slice";
import { toast } from "react-toastify";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  dataType: "bus" | "driver";
  id?: number;
  isActive?: boolean;
};

const DeactivateModal = ({ isOpen, onClose, id, dataType, isActive }: Props) => {
  const [deactivateBus, { isLoading: isLoadingBus, isError: isErrorBus }] =
    useDeactivateBusMutation();
  const [deactivateDriver, { isLoading: isLoadingDriver, isError: isErrorDriver }] =
    useDeactivateDriverMutation();
  const [activateBus, { isLoading: isLoadingActivateBus, isError: isErrorActivateBus }] =
    useActivateBusMutation();
  const [activateDriver, { isLoading: isLoadingActivateDriver, isError: isErrorActivateDriver }] =
    useActivateDriverMutation();

  const handleDeactivate = async () => {
    if (!id) return;
    try {
      if (dataType === "bus") {
        await deactivateBus(id).unwrap();
      }

      if (dataType === "driver") {
        await deactivateDriver(id).unwrap();
      }

      toast.success("Success");
      onClose();
    } catch (error) {}
  };

  const handleActivate = async () => {
    if (!id) return;
    try {
      if (dataType === "bus") {
        await activateBus(id).unwrap();
      }

      if (dataType === "driver") {
        await activateDriver(id).unwrap();
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
      closeOnOverlayClick={isLoadingBus || isLoadingDriver ? false : true}
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
          {isActive ? `Deactivate ${dataType}` : `Activate ${dataType}`}
        </Text>
        <Text mt={1.5} textAlign="center">
          Are you sure you want to{" "}
          {isActive ? `deactivate this ${dataType}` : `activate this ${dataType}`}?
        </Text>

        <Grid templateColumns={["1fr", null, "1fr 1fr"]} mt={8} gap={4}>
          <GridItem>
            <CustomBtn
              light
              onClick={onClose}
              isDisabled={
                isLoadingBus || isLoadingDriver || isLoadingActivateBus || isLoadingActivateDriver
              }
            >
              No
            </CustomBtn>
          </GridItem>
          <GridItem order={["-1", null, 1]}>
            <CustomBtn
              onClick={isActive ? handleDeactivate : handleActivate}
              isLoading={
                isLoadingBus || isLoadingDriver || isLoadingActivateBus || isLoadingActivateDriver
              }
              isError={isErrorBus || isErrorDriver || isErrorActivateBus || isErrorActivateDriver}
            >
              Yes
            </CustomBtn>
          </GridItem>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default DeactivateModal;
