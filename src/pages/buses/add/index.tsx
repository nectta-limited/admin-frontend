import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import { useCreateBusMutation } from "@/redux/api/buses.api.slice";
import { createBusSchema } from "@/validation/buses.validation";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
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

const AddBusPage: NextPage = () => {
  const router = useRouter();
  const [createBus, { isLoading, isError }] = useCreateBusMutation();

  const handleCreateBus = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    try {
      await createBus({ ...values, busNumber: Number(values.busNumber) }).unwrap();
      toast.success("Bus created successfully");
      router.replace("/buses");
      actions.resetForm();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: createBusSchema,
    onSubmit: handleCreateBus,
  });

  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Add a Bus
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
            Enter the information below to add a bus
          </Text>
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
            >
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default AddBusPage;
