import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomReactTable from "@/components/CustomReactTable";
import DeactivateModal from "@/components/DeactivateModal";
import DeleteModal from "@/components/DeleteModal";
import StatusText from "@/components/StatusText";
import { NECTTA_TABLE_LIMIT } from "@/constants";
import Sleep from "@/helpers/sleep";
import BusTableActionButton from "@/pages/buses/components/BusTableActionButton";
import { useGetBusesQuery, useSearchBusesQuery } from "@/redux/api/buses.api.slice";
import { IBus } from "@/types/buses";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { PaginationState, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";

const columnHelper = createColumnHelper<IBus>();

const BusesPage: NextPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isBusActive, setIsBusActive] = useState<boolean>();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: NECTTA_TABLE_LIMIT,
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
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useSearchBusesQuery(
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

  const handleOpenDeactivateModal = (id: number, isActive: boolean) => {
    setSelectedId(id);
    setIsBusActive(isActive);
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
      cell: (info) => <>{info.row.index + 1}</>,
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
        <Flex w="full" align="center" justify="space-between" mb={[3, 4]}>
          <Flex align="center" gap={2}>
            <Text color="primary" fontSize={34} fontWeight="700">
              {searchValue ? searchData?.data?.length ?? 0 : totalData?.data?.length ?? 0}
            </Text>
            <Text>
              {(searchValue ? searchData?.data?.length : totalData?.data?.length) === 1
                ? "Bus"
                : "Buses"}
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
          plural="Buses"
          singular="Bus"
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

export default BusesPage;
