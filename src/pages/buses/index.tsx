import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomReactTable from "@/components/CustomReactTable";
import DeactivateModal from "@/components/DeactivateModal";
import DeleteModal from "@/components/DeleteModal";
import StatusText from "@/components/StatusText";
import BusTableActionButton from "@/pages/buses/components/BusTableActionButton";
import { useGetBusesQuery } from "@/redux/api/buses.api.slice";
import { IBus } from "@/types/buses";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { PaginationState, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const columnHelper = createColumnHelper<IBus>();

const BusesPage: NextPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [isBusActive, setIsBusActive] = useState<boolean>();
  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const { data, isLoading, isFetching } = useGetBusesQuery({
    page: pageIndex + 1,
    limit: pageSize,
  });
  const {
    data: totalData,
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
  } = useGetBusesQuery({});
  const {
    isOpen: isOpenDeactivate,
    onClose: onCloseDeactivate,
    onOpen: onOpenDeactivate,
  } = useDisclosure();
  const { isOpen: isOpenDelete, onClose: onCloseDelete, onOpen: onOpenDelete } = useDisclosure();

  const handleOpenDeleteModal = (id: number) => {
    setSelectedId(id);
    onOpenDelete();
  };

  const handleOpenDeactivateModal = (id: number, isActive: boolean) => {
    setSelectedId(id);
    setIsBusActive(isActive);
    onOpenDeactivate();
  };

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

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
      cell: (info) => (
        <BusTableActionButton
          id={info.getValue()}
          deactivateAction={handleOpenDeactivateModal}
          deleteAction={handleOpenDeleteModal}
          isActive={info.row.original.status.toLowerCase() === "active"}
        />
      ),
      header: () => <></>,
    }),
  ];

  return (
    <AuthLayout>
      <DeactivateModal
        isOpen={isOpenDeactivate}
        onClose={onCloseDeactivate}
        id={selectedId}
        dataType={"bus"}
        isActive={isBusActive}
      />
      <DeleteModal isOpen={isOpenDelete} onClose={onCloseDelete} id={selectedId} dataType={"bus"} />

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
          totalCount={totalData?.data?.length ?? 0}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPagination={setPagination}
          pagination={pagination}
        />
      </Box>
    </AuthLayout>
  );
};

export default BusesPage;
