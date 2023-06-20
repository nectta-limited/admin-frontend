import AuthLayout from "@/components/AuthLayout";
import { Box, Center, Grid, Heading, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import DataBox from "./components/DataBox";
import { useGetDataCountQuery } from "@/redux/api/account.api.slice";

const DashboardPage: NextPage = () => {
  const { data, isLoading } = useGetDataCountQuery();

  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Dashboard
      </Heading>

      <Grid
        mt={[6, 8]}
        w="full"
        templateColumns={["1fr", null, "1fr 1fr", "1fr 1fr 1fr 1fr"]}
        gap={[4, null, 5]}
      >
        <DataBox link="/buses" count={data?.data?.buses ?? 0} title="Buses" />
        <DataBox link="/drivers" count={data?.data?.drivers ?? 0} title="Drivers" />
        <DataBox link="/parents" count={data?.data?.parents ?? 0} title="Parents" />
        <DataBox link="/" count={0} title="Students" />
      </Grid>
    </AuthLayout>
  );
};

export default DashboardPage;
