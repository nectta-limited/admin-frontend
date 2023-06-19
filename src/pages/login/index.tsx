import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import GuestLayout from "@/components/GuestLayout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Box, Center, Flex, Heading, IconButton, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React, { useState } from "react";

const LoginPage: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

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
            Login to gain access to your dashboard
          </Text>

          <form>
            <VStack mt={[4, 8]} spacing={[4, 5]}>
              <CustomInput
                id="email"
                label="Email Address"
                inputProps={{
                  type: "email",
                }}
                isRequired
              />
              <CustomInput
                id="password"
                label="Password"
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
            </VStack>

            <Flex w="full" justify="flex-end" mt="2">
              <Link href="#">
                <Text color="primary" textDecoration="underline" _hover={{ opacity: "0.75" }}>
                  Forgot Password?
                </Text>
              </Link>
            </Flex>

            <Box mt={[8, 10]}>
              <CustomBtn type="submit">Login</CustomBtn>
            </Box>
          </form>
        </Box>
      </Center>
    </GuestLayout>
  );
};

export default LoginPage;
