import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomReactTable from "@/components/CustomReactTable";
import StatusText from "@/components/StatusText";
import BusTableActionButton from "@/pages/buses/components/BusTableActionButton";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import { IBus } from "@/types/buses";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const columnHelper = createColumnHelper<IBus>();

const BusesPage: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetBusesQuery({});

  const columns = [
    columnHelper.accessor((row) => row.id, {
      id: "id",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>#</>,
    }),
    columnHelper.accessor((row) => row.busNumber, {
      id: "busNumber",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Bus Number</>,
    }),
    columnHelper.accessor((row) => row.busType, {
      id: "busType",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Bus Type</>,
    }),
    columnHelper.accessor((row) => row.driver, {
      id: "driver",
      cell: (info) => <>{info.getValue() || "-"}</>,
      header: () => <>Driver</>,
    }),
    columnHelper.accessor((row) => row.numStudents, {
      id: "numStudents",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>No. Of Students</>,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => <StatusText status={info.getValue()} />,
      header: () => <>Status</>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "busId",
      cell: (info) => <BusTableActionButton />,
      header: () => <></>,
    }),
  ];

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

      <Box w="full" mt={[8]}>
        <CustomReactTable
          data={data?.data ?? []}
          columns={columns}
          plural="Buses"
          singular="Bus"
          isLoading={isLoading}
        />
      </Box>
    </AuthLayout>
  );
};

export default BusesPage;
