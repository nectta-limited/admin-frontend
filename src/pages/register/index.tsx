import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import GuestLayout from "@/components/GuestLayout";
import { useRegisterUserMutation } from "@/redux/api/account.api.slice";
import { loginSchema } from "@/validation/account.validation";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Box, Center, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface IFormValues {
  email: string;
  password: string;
}

const initialValues: IFormValues = {
  email: "",
  password: "",
};

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();

  const handleRegisterUser = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    try {
      await registerUser(values).unwrap();
      toast.success("Registration successful");
      router.push("/login");
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: handleRegisterUser,
  });

  return (
    <GuestLayout>
      <Center w="full" h="full">
        <Box
          maxW={550}
          w="full"
          py={[8, 10]}
          px={[4, 8]}
          bg="white"
          borderRadius={8}
          className="appBox"
        >
          <Heading textAlign="center" fontSize={["1.4rem", "1.75rem"]}>
            Nectta Admin Portal
          </Heading>
          <Text textAlign="center" fontSize={["1rem", "1.2rem"]}>
            Register user
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack mt={[4, 8]} spacing={[4, 5]}>
              <CustomInput
                id="email"
                label="Email Address"
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
                id="password"
                label="Password"
                inputProps={{
                  type: showPassword ? "text" : "password",
                  value: values.password,
                  onChange: handleChange,
                  onBlur: handleBlur("password"),
                  isInvalid: errors.password && touched.password ? true : false,
                }}
                errorText={errors.password && touched.password ? errors.password : null}
                rightEl={
                  <IconButton
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label="toggle password view"
                    color="#1F1F1F"
                    bg="transparent"
                    onClick={() => setShowPassword((prev) => !prev)}
                    _hover={{
                      backgroundColor: "transparent",
                      opacity: ".65",
                    }}
                  />
                }
                isRequired
              />
            </VStack>

            <Flex w="full" justify="flex-end" mt="2">
              <Link href="#">
                <Text color="primary" textDecoration="underline" _hover={{ opacity: "0.75" }}>
                  Forgot Password?
                </Text>
              </Link>
            </Flex>

            <Box mt={[8, 10]}>
              <CustomBtn type="submit" isLoading={isLoading} isError={isError}>
                Register
              </CustomBtn>
            </Box>
          </form>
        </Box>
      </Center>
    </GuestLayout>
  );
};

export default LoginPage;
