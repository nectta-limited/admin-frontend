import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import GuestLayout from "@/components/GuestLayout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Box, Center, Heading, IconButton, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";

const CreateNewPasswordPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
            Create a New Password
          </Heading>

          <form>
            <VStack mt={[4, 8]} spacing={[4, 5]}>
              <CustomInput
                id="password"
                label="Enter Password"
                inputProps={{
                  type: showPassword ? "text" : "password",
                }}
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
                id="passwordConfirm"
                label="Confirm Password"
                inputProps={{
                  type: showPasswordConfirm ? "text" : "password",
                }}
                rightEl={
                  <IconButton
                    icon={showPasswordConfirm ? <ViewOffIcon /> : <ViewIcon />}
                    aria-label="toggle password view"
                    color="#1F1F1F"
                    bg="transparent"
                    onClick={() => setShowPasswordConfirm((prev) => !prev)}
                    _hover={{
                      backgroundColor: "transparent",
                      opacity: ".65",
                    }}
                  />
                }
                isRequired
              />
            </VStack>

            <Box mt={[8, 10]}>
              <CustomBtn type="submit">Reset Password</CustomBtn>
            </Box>
          </form>
        </Box>
      </Center>
    </GuestLayout>
  );
};

export default CreateNewPasswordPage;
