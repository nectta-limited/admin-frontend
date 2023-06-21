import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import StatusText from "@/components/StatusText";
import { useGetDriversQuery } from "@/redux/api/drivers.api.slice";
import { IDriver } from "@/types/drivers";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import DriverTableActionButton from "./components/DriverTableActionButton";
import CustomReactTable from "@/components/CustomReactTable";
import dayjs from "dayjs";

const columnHelper = createColumnHelper<IDriver>();

const DriversPage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetDriversQuery({});

  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>#</>,
    }),
    columnHelper.accessor((row) => row.createdAt, {
      id: "createdAt",
      cell: (info) => <>{dayjs(info.getValue()).format("DD/MM/YY")}</>,
      header: () => <>Date Added</>,
    }),
    columnHelper.accessor((row) => row.driverId, {
      id: "driverId",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Driver ID</>,
    }),
    columnHelper.accessor((row) => row.driverName, {
      id: "driverName",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Name</>,
    }),
    columnHelper.accessor((row) => row.driverEmail, {
      id: "driverEmail",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Email Address</>,
    }),
    columnHelper.accessor((row) => row.driverPhoneNumber, {
      id: "driverPhoneNumber",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Phone Number</>,
    }),
    columnHelper.accessor((row) => row.busNumber, {
      id: "busNumber",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Bus Number</>,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => <StatusText status={info.getValue()} />,
      header: () => <>Status</>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "driverIdBtn",
      cell: (info) => <DriverTableActionButton />,
      header: () => <></>,
    }),
  ];

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

      <Box w="full" mt={[8]}>
        <CustomReactTable
          data={data?.data ?? []}
          columns={columns}
          plural="Drivers"
          singular="Driver"
          isLoading={isLoading}
        />
      </Box>
    </AuthLayout>
  );
};

export default DriversPage;
