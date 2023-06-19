import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import { Flex, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const BusesPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthLayout>
      <Flex w="full" justify={["space-between"]} align="center">
        <Heading fontSize={[20, 26]} color="blackOne">
          Buses
        </Heading>

        <CustomBtn light maxW={[140, 200]} onClick={() => router.push("/buses/add")}>
          + Add Bus
        </CustomBtn>
      </Flex>
    </AuthLayout>
  );
};

export default BusesPage;
