import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import GuestLayout from "@/components/GuestLayout";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const ResetPasswordPage: NextPage = () => {
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
            Reset Your Admin Password
          </Heading>

          <form>
            <Box mt={[4, 8]}>
              <CustomInput
                id="email"
                label="Email Address"
                inputProps={{
                  type: "email",
                }}
                isRequired
              />
            </Box>

            <Flex w="full" mt="2" align="center" gap={2}>
              <InfoOutlineIcon color="orangeTwo" />
              <Text color="primary">A password reset link will be sent to your email address</Text>
            </Flex>

            <Box mt={[8, 10]}>
              <CustomBtn type="submit">Proceed</CustomBtn>
            </Box>

            <Center mt="4">
              <Link href="#">
                <Text color="primary" textDecoration="underline" _hover={{ opacity: "0.75" }}>
                  Back to Login
                </Text>
              </Link>
            </Center>
          </form>
        </Box>
      </Center>
    </GuestLayout>
  );
};

export default ResetPasswordPage;
