import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import { useCreateDriverMutation } from "@/redux/api/drivers.api.slice";
import { createDriverSchema } from "@/validation/drivers.validation";
import {
  Box,
  Center,
  Grid,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { toast } from "react-toastify";

interface IFormValues {
  driverName: string;
  driverEmail: string;
  busNumber: { [key: string]: any } | undefined;
  driverPhoneNumber: string;
}

const initialValues: IFormValues = {
  driverName: "",
  driverEmail: "",
  busNumber: undefined,
  driverPhoneNumber: "",
};

const AddDriverPage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading: isLoadingBuses } = useGetBusesQuery({});
  const [createDriver, { isLoading, isError }] = useCreateDriverMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const formattedBuses = useMemo(() => {
    if (!data?.data?.length) return [];

    return data?.data?.map((bus) => ({ value: bus.busNumber, label: bus.busNumber }));
  }, [data]);

  const handleCreateDriver = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    try {
      await createDriver({
        ...values,
        busNumber: values.busNumber?.value as string,
      }).unwrap();

      onOpen();
      actions.resetForm();
    } catch (error) {}
  };

  const routeBack = () => {
    router.push("/drivers");
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError,
  } = useFormik({
    initialValues,
    validationSchema: createDriverSchema,
    onSubmit: handleCreateDriver,
  });

  return (
    <AuthLayout>
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
            Driver Added Successfully
          </Text>
          <Text mt={1.5} textAlign="center">
            This driver has been added successfully.. Login credentials to login to the nectta
            mobile app has been sent to the email address (insert driver’s email address)
          </Text>

          <Center mt="8">
            <CustomBtn onClick={routeBack} maxW={300} w="full">
              Back to Dashboard
            </CustomBtn>
          </Center>
        </ModalContent>
      </Modal>

      <Heading fontSize={[20, 26]} color="blackOne">
        Add a Driver
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
            Enter the information below to add a driver
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box px={[4, null, 6]} py={[4, null, 5]}>
            <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={[4, 6]}>
              <CustomInput
                id="driverName"
                label="Driver name"
                inputProps={{
                  value: values.driverName,
                  onChange: handleChange,
                  onBlur: handleBlur("driverName"),
                  isInvalid: errors.driverName && touched.driverName ? true : false,
                }}
                errorText={errors.driverName && touched.driverName ? errors.driverName : null}
                isRequired
              />

              <CustomInput
                id="driverEmail"
                label="Driver email address"
                inputProps={{
                  value: values.driverEmail,
                  onChange: handleChange,
                  onBlur: handleBlur("driverEmail"),
                  isInvalid: errors.driverEmail && touched.driverEmail ? true : false,
                  type: "email",
                }}
                errorText={errors.driverEmail && touched.driverEmail ? errors.driverEmail : null}
                isRequired
              />

              <CustomInput
                id="driverPhoneNumber"
                label="Driver phone number"
                inputProps={{
                  value: values.driverPhoneNumber,
                  onChange: handleChange,
                  onBlur: handleBlur("driverPhoneNumber"),
                  isInvalid: errors.driverPhoneNumber && touched.driverPhoneNumber ? true : false,
                  type: "number",
                }}
                errorText={
                  errors.driverPhoneNumber && touched.driverPhoneNumber
                    ? errors.driverPhoneNumber
                    : null
                }
                isRequired
              />

              <CustomSelect
                id="busNumber"
                label="Bus number (this is the bus number for the bus the driver will be driving)"
                selectProps={{
                  onChange: (val: any) => {
                    setFieldValue("busNumber", val, true);
                  },
                  onBlur: (e) => setFieldTouched("busNumber", true, true),
                  placeholder: "Select",
                  value: values.busNumber,
                }}
                selectOptions={formattedBuses}
                select
                selectLoading={isLoadingBuses}
                isRequired
                aria-invalid={errors.busNumber && touched.busNumber ? true : false}
                errorText={errors.busNumber && touched.busNumber ? errors.busNumber : null}
              />
            </Grid>

            <CustomBtn
              mt={[8, 10]}
              mb={10}
              maxW={["full", null, 200]}
              type="submit"
              isLoading={isLoading}
              isError={isError}
            >
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default AddDriverPage;
