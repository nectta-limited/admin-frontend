import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import { useCreateParentMutation } from "@/redux/api/parents.api.slice";
import { createParentSchema } from "@/validation/parents.validation";
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
import React, { useEffect, useMemo, useState } from "react";
import Ward from "../components/Ward";
import { toast } from "react-toastify";

const NUM_OF_CHILDREN = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

interface IFormValues {
  name: string;
  email: string;
  busNumber: { [key: string]: any } | undefined;
  phoneNumber: string;
  numberOfChildren: { [key: string]: any } | undefined;
}

const initialValues: IFormValues = {
  name: "",
  email: "",
  busNumber: undefined,
  phoneNumber: "",
  numberOfChildren: undefined,
};

export interface IWardItem {
  name: string;
  grade: string;
  id: number;
}

const AddParentPage: NextPage = () => {
  const router = useRouter();
  const [wards, setWards] = useState<IWardItem[]>([]);
  const { data, isLoading: isLoadingBuses } = useGetBusesQuery({});
  const [createParent, { isLoading, isError }] = useCreateParentMutation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const formattedBuses = useMemo(() => {
    if (!data?.data?.length) return [];

    return data?.data?.map((bus) => ({ value: bus.busNumber, label: bus.busNumber }));
  }, [data]);

  const updateWardGrade = (id: number, grade: string) => {
    setWards((prev) => prev.map((ward) => (ward.id === id ? { ...ward, grade } : ward)));
  };

  const updateWardName = (id: number, name: string) => {
    setWards((prev) => prev.map((ward) => (ward.id === id ? { ...ward, name } : ward)));
  };

  const validateWardsData = () => {
    if (!wards.length) return false;
    let res = true;
    wards.forEach((ward) => {
      if (!ward.grade.trim() || !ward.name.trim()) {
        res = false;
        return;
      }
    });
    return res;
  };

  const handleCreateParent = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    const canSubmit = validateWardsData();
    if (!canSubmit) {
      return toast.error("Please fill in all your ward data");
    }
    try {
      await createParent({
        name: values.name,
        email: values.email,
        busNumber: values?.busNumber?.value,
        numberOfChildren: values.numberOfChildren?.value,
        wards: wards.map((i) => ({ name: i.name, grade: i.grade })),
        phoneNumber: values.phoneNumber,
      }).unwrap();

      onOpen();
      actions.resetForm();
    } catch (error) {}
  };

  const routeBack = () => {
    router.push("/parents");
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
    validationSchema: createParentSchema,
    onSubmit: handleCreateParent,
  });

  useEffect(() => {
    const numOfChildren = Number(values?.numberOfChildren?.value as string);
    if (numOfChildren === wards.length) return;

    if (numOfChildren > wards.length) {
      const diff = numOfChildren - wards.length;
      const newData: IWardItem[] = Array.from(Array(Number(diff) + 1).keys())
        .slice(1)
        .map((i) => ({ name: "", grade: "", id: i + wards.length }));
      return setWards((prev) => [...prev, ...newData]);
    }

    if (numOfChildren < wards.length) {
      const newData: IWardItem[] = [...wards].filter((i, n) => n < numOfChildren);
      return setWards(newData);
    }
  }, [values?.numberOfChildren?.value]);

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
            Parent Added Successfully
          </Text>
          <Text mt={1.5} textAlign="center">
            This parent has been added successfully.. Login credentials to login to the nectta
            mobile app has been sent to the parent’s email address (insert parent’s email address)
          </Text>

          <Center mt="8">
            <CustomBtn onClick={routeBack} maxW={300} w="full">
              Back to Dashboard
            </CustomBtn>
          </Center>
        </ModalContent>
      </Modal>

      <Heading fontSize={[20, 26]} color="blackOne">
        Add a Parent
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
                id="name"
                label="Parent name"
                inputProps={{
                  value: values.name,
                  onChange: handleChange,
                  onBlur: handleBlur("name"),
                  isInvalid: errors.name && touched.name ? true : false,
                }}
                errorText={errors.name && touched.name ? errors.name : null}
                isRequired
              />

              <CustomInput
                id="email"
                label="Parent email address"
                inputProps={{
                  value: values.email,
                  onChange: handleChange,
                  onBlur: handleBlur("email"),
                  isInvalid: errors.email && touched.email ? true : false,
                  type: "email",
                }}
                errorText={errors.email && touched.email ? errors.email : null}
                isRequired
              />

              <CustomInput
                id="phoneNumber"
                label="Parent phone number"
                inputProps={{
                  value: values.phoneNumber,
                  onChange: handleChange,
                  onBlur: handleBlur("phoneNumber"),
                  isInvalid: errors.phoneNumber && touched.phoneNumber ? true : false,
                  type: "number",
                }}
                errorText={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                isRequired
              />

              <CustomSelect
                id="numberOfChildren"
                label="Number of children"
                selectProps={{
                  onChange: (val: any) => {
                    setFieldValue("numberOfChildren", val, true);
                  },
                  onBlur: (e) => setFieldTouched("numberOfChildren", true, true),
                  placeholder: "Select",
                  value: values.numberOfChildren,
                }}
                selectOptions={NUM_OF_CHILDREN}
                select
                isRequired
                aria-invalid={errors.numberOfChildren && touched.numberOfChildren ? true : false}
                errorText={
                  errors.numberOfChildren && touched.numberOfChildren
                    ? errors.numberOfChildren
                    : null
                }
              />

              {wards?.map((i) => (
                <Ward
                  wardInfo={i}
                  key={i.id}
                  updateWardGrade={updateWardGrade}
                  updateWardName={updateWardName}
                />
              ))}

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

export default AddParentPage;
