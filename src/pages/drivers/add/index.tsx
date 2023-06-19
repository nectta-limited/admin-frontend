import AuthLayout from "@/components/AuthLayout";
import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const AddDriverPage: NextPage = () => {
  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Add a Driver
      </Heading>
    </AuthLayout>
  );
};

export default AddDriverPage;
