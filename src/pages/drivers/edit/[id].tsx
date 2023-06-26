import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import {
  useCreateDriverMutation,
  useGetSingleDriverQuery,
  useUpdateDriverMutation,
} from "@/redux/api/drivers.api.slice";
import { createDriverSchema } from "@/validation/drivers.validation";
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
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

const EditDriverPage: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState<number>();
  const { data, isLoading: isLoadingBuses } = useGetBusesQuery({});
  const [updateDriver, { isLoading, isError }] = useUpdateDriverMutation();
  const { data: driverData, isLoading: isLoadingDriver } = useGetSingleDriverQuery(id as number, {
    skip: !id,
  });

  const formattedBuses = useMemo(() => {
    if (!data?.data?.length) return [];

    return data?.data?.map((bus) => ({ value: bus.busNumber, label: bus.busNumber }));
  }, [data]);

  const handleUpdateDriver = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    if (!id) return;
    try {
      await updateDriver({
        id,
        body: {
          ...values,
          busNumber: values.busNumber?.value as string,
        },
      }).unwrap();
      toast.success("Driver updated successfully");
      router.replace("/drivers");
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
    onSubmit: handleUpdateDriver,
  });

  useEffect(() => {
    if (router.query.id) {
      setId(Number(router.query.id as string));
    }
  }, [router.query]);

  useEffect(() => {
    if (driverData?.data) {
      setFieldValue("driverName", driverData?.data?.driverName, true);
      setFieldValue("driverEmail", driverData?.data?.driverEmail, true);
      setFieldValue("driverPhoneNumber", driverData?.data?.driverPhoneNumber, true);
      setFieldValue(
        "busNumber",
        driverData?.data?.busNumber
          ? { label: driverData?.data?.busNumber, value: driverData?.data?.busNumber }
          : undefined,
        true
      );
    }
  }, [driverData]);

  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Edit Driver Info
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Flex align="center">
            <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
              Enter the information below to update a driver
            </Text>
            {isLoadingDriver ? <Spinner color="primary" /> : null}
          </Flex>
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
                  isDisabled: isLoadingDriver,
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
                  isDisabled: isLoadingDriver,
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
                  isDisabled: isLoadingDriver,
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
                  isDisabled: isLoadingDriver,
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
              isDisabled={isLoadingDriver}
            >
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default EditDriverPage;
