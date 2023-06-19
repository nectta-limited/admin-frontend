import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import { Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const DriversPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthLayout>
      <Flex w="full" justify={["space-between"]} align="center">
        <Heading fontSize={[20, 26]} color="blackOne">
          Drivers
        </Heading>

        <CustomBtn light maxW={[140, 200]} onClick={() => router.push("/drivers/add")}>
          + Add Driver
        </CustomBtn>
      </Flex>
    </AuthLayout>
  );
};

export default DriversPage;
