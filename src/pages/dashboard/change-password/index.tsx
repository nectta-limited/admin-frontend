import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import { useGetUser } from "@/hooks/reduxHooks";
import { useChangePasswordMutation } from "@/redux/api/account.api.slice";
import { changePasswordSchema } from "@/validation/account.validation";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Grid, Heading, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { FormikHelpers, useFormik } from "formik";
import { NextPage } from "next";
import React, { useState } from "react";
import { toast } from "react-toastify";
import ChangePasswordModal from "../components/ChangePasswordModal";

interface IFormValues {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const initialValues: IFormValues = {
  oldPassword: "",
  password: "",
  passwordConfirmation: "",
};

const ChangePasswordPage: NextPage = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [changePassword, { isLoading, isError }] = useChangePasswordMutation();
  const userData = useGetUser();

  const handleChangePassword = async (values: IFormValues, actions: FormikHelpers<IFormValues>) => {
    if (!userData) return;
    try {
      const res = await changePassword({
        email: userData?.data?.email,
        oldPassword: values.oldPassword,
        newPassword: values.password,
      }).unwrap();

      onOpen();
    } catch (error) {}
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: handleChangePassword,
  });

  return (
    <AuthLayout>
      <ChangePasswordModal isOpen={isOpen} onClose={onClose} />

      <Heading fontSize={[20, 26]} color="blackOne">
        Change Password
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
            Enter the information below to change your password
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box px={[4, null, 6]} py={[4, null, 5]}>
            <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={[4, 6]}>
              <CustomInput
                id="oldPassword"
                label="Old Password"
                inputProps={{
                  type: showOldPassword ? "text" : "password",
                  value: values.oldPassword,
                  onChange: handleChange,
                  onBlur: handleBlur("oldPassword"),
                  isInvalid: errors.oldPassword && touched.oldPassword ? true : false,
                }}
                errorText={errors.oldPassword && touched.oldPassword ? errors.oldPassword : null}
                rightEl={
                  <IconButton
                    icon={showOldPassword ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label="toggle password view"
                    color="#1F1F1F"
                    bg="transparent"
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    _hover={{
                      backgroundColor: "transparent",
                      opacity: ".65",
                    }}
                  />
                }
                isRequired
              />

              <CustomInput
                id="password"
                label="New Password"
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

              <CustomInput
                id="passwordConfirmation"
                label="Confirm New Password"
                inputProps={{
                  type: showPasswordConfirmation ? "text" : "password",
                  value: values.passwordConfirmation,
                  onChange: handleChange,
                  onBlur: handleBlur("passwordConfirmation"),
                  isInvalid:
                    errors.passwordConfirmation && touched.passwordConfirmation ? true : false,
                }}
                errorText={
                  errors.passwordConfirmation && touched.passwordConfirmation
                    ? errors.passwordConfirmation
                    : null
                }
                rightEl={
                  <IconButton
                    icon={showPasswordConfirmation ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label="toggle password view"
                    color="#1F1F1F"
                    bg="transparent"
                    onClick={() => setShowPasswordConfirmation((prev) => !prev)}
                    _hover={{
                      backgroundColor: "transparent",
                      opacity: ".65",
                    }}
                  />
                }
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

export default ChangePasswordPage;
