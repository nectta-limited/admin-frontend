import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import StatusText from "@/components/StatusText";
import { useGetDriversQuery, useSearchDriversQuery } from "@/redux/api/drivers.api.slice";
import { IDriver } from "@/types/drivers";
import { Box, Flex, Heading, Text, useDisclosure } from "@chakra-ui/react";
import { PaginationState, createColumnHelper } from "@tanstack/react-table";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import DriverTableActionButton from "./components/DriverTableActionButton";
import CustomReactTable from "@/components/CustomReactTable";
import dayjs from "dayjs";
import DeactivateModal from "@/components/DeactivateModal";
import DeleteModal from "@/components/DeleteModal";
import { NECTTA_TABLE_LIMIT } from "@/constants";
import Sleep from "@/helpers/sleep";

const columnHelper = createColumnHelper<IDriver>();

const DriversPage: NextPage = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number>();
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [isDriverActive, setIsDriverActive] = useState<boolean>();
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: NECTTA_TABLE_LIMIT,
  });
  const { data, isLoading, isFetching } = useGetDriversQuery({
    page: pageIndex + 1,
    limit: pageSize,
  });
  const {
    data: totalData,
    isLoading: isLoadingTotal,
    isFetching: isFetchingTotal,
  } = useGetDriversQuery({});
  const {
    data: searchData,
    isLoading: isLoadingSearch,
    isFetching: isFetchingSearch,
  } = useSearchDriversQuery(
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
    setIsDriverActive(isActive);
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
      cell: (info) => (
        <DriverTableActionButton
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
        dataType={"driver"}
        isActive={isDriverActive}
      />
      <DeleteModal
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
        id={selectedId}
        dataType={"driver"}
      />

      <Flex w="full" justify={["space-between"]} align="center">
        <Heading fontSize={[20, 26]} color="blackOne">
          Drivers
        </Heading>

        <CustomBtn light maxW={[140, 200]} onClick={() => router.push("/drivers/add")}>
          + Add Driver
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
                ? "Driver"
                : "Drivers"}
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
          plural="Drivers"
          singular="Driver"
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

export default DriversPage;
