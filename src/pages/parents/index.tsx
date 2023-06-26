import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomReactTable from "@/components/CustomReactTable";
import StatusText from "@/components/StatusText";
import { useGetParentsQuery, useSearchParentsQuery } from "@/redux/api/parents.api.slice";
import { IParent } from "@/types/parents";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { PaginationState, createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import ParentTableActionButton from "./components/ParentTableActionButton";
import DeleteModal from "@/components/DeleteModal";
import { NECTTA_TABLE_LIMIT } from "@/constants";
import Sleep from "@/helpers/sleep";

const columnHelper = createColumnHelper<IParent>();

const ParentsPage: NextPage = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: NECTTA_TABLE_LIMIT,
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
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useSearchParentsQuery(
    {
      page: pageIndex + 1,
      limit: pageSize,
      query: searchValue.trim(),
    },
    { skip: !isSearch || !searchValue }
  );
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

  useEffect(() => {
    if (searchValue === "") {
      setIsSearch(false);
      setPagination({ pageIndex: 0, pageSize: NECTTA_TABLE_LIMIT });
      return;
    }

    if (searchValue) {
      Sleep(2000).then(() => {
        setPagination({ pageIndex: 0, pageSize: NECTTA_TABLE_LIMIT });
        setIsSearch(true);
      });
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchData?.data) {
      setIsSearch(false);
    }
  }, [searchData]);

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
        <Flex w="full" align="center" justify="space-between" mb={[3, 4]}>
          <Flex align="center" gap={2}>
            <Text color="primary" fontSize={34} fontWeight="700">
              {searchValue ? searchData?.data?.length ?? 0 : totalData?.data?.length ?? 0}
            </Text>
            <Text>
              {(searchValue ? searchData?.data?.length : totalData?.data?.length) === 1
                ? "Parent"
                : "Parents"}
            </Text>
          </Flex>

          <Flex align="center" gap={1.5}>
            <Text color="blackFour">Search</Text>

            <input
              className="tableInput"
              value={searchValue}
              type="search"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Flex>
        </Flex>

        <CustomReactTable
          data={searchValue ? searchData?.data ?? [] : data?.data ?? []}
          columns={columns}
          plural="Parents"
          singular="Parent"
          isLoading={isLoading}
          totalCount={searchValue ? searchData?.data?.length ?? 0 : totalData?.data?.length ?? 0}
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
