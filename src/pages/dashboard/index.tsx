import AuthLayout from "@/components/AuthLayout";
import { Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const DashboardPage: NextPage = () => {
  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Dashboard
      </Heading>
    </AuthLayout>
  );
};

export default DashboardPage;
