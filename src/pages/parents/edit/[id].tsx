import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import {
  useCreateParentMutation,
  useGetSingleParentQuery,
  useUpdateParentMutation,
} from "@/redux/api/parents.api.slice";
import { createParentSchema } from "@/validation/parents.validation";
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
import Ward from "../components/Ward";
import { toast } from "react-toastify";
import { IWard } from "@/types/parents";

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

const EditParentPage: NextPage = () => {
  const router = useRouter();
  const [id, setId] = useState<number>();
  const [wards, setWards] = useState<IWardItem[]>([]);
  const { data, isLoading: isLoadingBuses } = useGetBusesQuery({});
  const [updateParent, { isLoading, isError }] = useUpdateParentMutation();
  const { data: parentData, isLoading: isLoadingParent } = useGetSingleParentQuery(id as number, {
    skip: !id,
  });

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
    if (!id) return;
    try {
      await updateParent({
        id,
        body: {
          name: values.name,
          email: values.email,
          busNumber: values?.busNumber?.value,
          numberOfChildren: values.numberOfChildren?.value,
          wards: wards.map((i) => ({ name: i.name, grade: i.grade })),
          phoneNumber: values.phoneNumber,
        },
      }).unwrap();
      toast.success("Parent updated successfully");
      router.replace("/parents");
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

  useEffect(() => {
    if (router.query.id) {
      setId(Number(router.query.id as string));
    }
  }, [router.query]);

  useEffect(() => {
    if (parentData?.data) {
      setFieldValue("name", parentData?.data?.name, true);
      setFieldValue("email", parentData?.data?.email, true);
      setFieldValue("phoneNumber", parentData?.data?.phoneNumber, true);
      setFieldValue(
        "busNumber",
        parentData?.data?.busNumber
          ? { label: parentData?.data?.busNumber, value: parentData?.data?.busNumber }
          : undefined,
        true
      );
      setFieldValue(
        "numberOfChildren",
        parentData?.data?.numberOfChildren
          ? { label: parentData?.data?.numberOfChildren, value: parentData?.data?.numberOfChildren }
          : undefined,
        true
      );
      const wardsArray: IWard[] = JSON.parse(parentData?.data?.wards);
      setWards(wardsArray.map((i, n) => ({ ...i, id: n + 1 })));
    }
  }, [parentData]);

  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Edit Parent Info
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Flex align="center">
            <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
              Enter the information below to update a parent
            </Text>
            {isLoadingParent ? <Spinner color="primary" /> : null}
          </Flex>
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
                  isDisabled: isLoadingParent,
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
                  isDisabled: isLoadingParent,
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
                  isDisabled: isLoadingParent,
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
                  isDisabled: isLoadingParent,
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
                  isDisabled: isLoadingParent,
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
              isDisabled={isLoadingParent}
            >
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default EditParentPage;
