import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import {
  useCreateBusMutation,
  useGetSingleBusQuery,
  useUpdateBusMutation,
} from "@/redux/api/buses.api.slice";
import { createBusSchema } from "@/validation/buses.validation";
import { Box, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IFormValues {
  busType: string;
  busNumber: string;
  busColor: string;
}

const initialValues: IFormValues = {
  busType: "",
  busNumber: "",
  busColor: "",
};

const EditBusPage: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState<number>();
  const [editBus, { isLoading, isError }] = useUpdateBusMutation();
  const { data, isLoading: isLoadingBus } = useGetSingleBusQuery(id as number, { skip: !id });

  const handleEditBus = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    if (!id) return;
    try {
      await editBus({ id, body: { ...values, busNumber: Number(values.busNumber) } }).unwrap();
      toast.success("Bus updated successfully");
      router.replace("/buses");
      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues,
      validationSchema: createBusSchema,
      onSubmit: handleEditBus,
    });

  useEffect(() => {
    if (router.query.id) {
      setId(Number(router.query.id as string));
    }
  }, [router.query]);

  useEffect(() => {
    if (data?.data) {
      setFieldValue("busNumber", data?.data?.busNumber, true);
      setFieldValue("busType", data?.data?.busType, true);
      setFieldValue("busColor", data?.data?.busColor, true);
    }
  }, [data]);

  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Edit Bus Info
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Flex align="center">
            <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
              Enter the information below to update a bus
            </Text>
            {isLoadingBus ? <Spinner color="primary" /> : null}
          </Flex>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box px={[4, null, 6]} py={[4, null, 5]}>
            <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={[4, 6]}>
              <CustomInput
                id="busNumber"
                label="Bus number"
                inputProps={{
                  value: values.busNumber,
                  onChange: handleChange,
                  onBlur: handleBlur("busNumber"),
                  isInvalid: errors.busNumber && touched.busNumber ? true : false,
                  type: "number",
                  isDisabled: isLoadingBus,
                }}
                errorText={errors.busNumber && touched.busNumber ? errors.busNumber : null}
                isRequired
              />

              <CustomInput
                id="busType"
                label="Bus type"
                inputProps={{
                  value: values.busType,
                  onChange: handleChange,
                  onBlur: handleBlur("busType"),
                  isInvalid: errors.busType && touched.busType ? true : false,
                  isDisabled: isLoadingBus,
                }}
                errorText={errors.busType && touched.busType ? errors.busType : null}
                isRequired
              />

              <CustomInput
                id="busColor"
                label="Bus Color"
                inputProps={{
                  value: values.busColor,
                  onChange: handleChange,
                  onBlur: handleBlur("busColor"),
                  isInvalid: errors.busColor && touched.busColor ? true : false,
                  isDisabled: isLoadingBus,
                }}
                errorText={errors.busColor && touched.busColor ? errors.busColor : null}
                isRequired
              />
            </Grid>

            <CustomBtn
              mt={[8, 10]}
              mb={10}
              maxW={["full", null, 200]}
              type="submit"
              isLoading={isLoading}
              isError={isError}
              isDisabled={isLoadingBus}
            >
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default EditBusPage;
