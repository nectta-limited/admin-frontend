import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomReactTable from "@/components/CustomReactTable";
import StatusText from "@/components/StatusText";
import { useGetParentsQuery } from "@/redux/api/parents.api.slice";
import { IParent } from "@/types/parents";
import { Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import { PaginationState, createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import ParentTableActionButton from "./components/ParentTableActionButton";
import DeleteModal from "@/components/DeleteModal";

const columnHelper = createColumnHelper<IParent>();

const ParentsPage: NextPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 1,
  });
  const { data, isLoading, isFetching } = useGetParentsQuery({
    page: pageIndex + 1,
    limit: pageSize,
  });
  const {
    data: totalData,
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
  } = useGetParentsQuery({});
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

  const handleOpenDeactivateModal = (id: number) => {
    setSelectedId(id);
    onOpenDeactivate();
  };

  const pagination = useMemo(
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
    columnHelper.accessor((row) => row.createdAt, {
      id: "createdAt",
      cell: (info) => <>{dayjs(info.getValue()).format("DD/MM/YY")}</>,
      header: () => <>Date Added</>,
    }),
    columnHelper.accessor((row) => row.parentId, {
      id: "parentId",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Parent ID</>,
    }),
    columnHelper.accessor((row) => row.name, {
      id: "name",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Name</>,
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Email Address</>,
    }),
    columnHelper.accessor((row) => row.phoneNumber, {
      id: "phoneNumber",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>Phone Number</>,
    }),
    columnHelper.accessor((row) => row.numberOfChildren, {
      id: "numberOfChildren",
      cell: (info) => <>{info.getValue()}</>,
      header: () => <>No of Children</>,
    }),
    columnHelper.accessor((row) => row.status, {
      id: "status",
      cell: (info) => <StatusText status={info.getValue()} />,
      header: () => <>Status</>,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "parentIdBtn",
      cell: (info) => (
        <ParentTableActionButton id={info.getValue()} deleteAction={handleOpenDeleteModal} />
      ),
      header: () => <></>,
    }),
  ];

  return (
    <AuthLayout>
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        id={selectedId}
        dataType={"parent"}
      />

      <Flex w="full" justify={["space-between"]} align="center">
        <Heading fontSize={[20, 26]} color="blackOne">
          Parents
        </Heading>

        <CustomBtn light maxW={[140, 200]} onClick={() => router.push("/parents/add")}>
          + Add Parent
        </CustomBtn>
      </Flex>

      <Box w="full" mt={[8]}>
        <CustomReactTable
          data={data?.data ?? []}
          columns={columns}
          plural="Parents"
          singular="Parent"
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

export default ParentsPage;
