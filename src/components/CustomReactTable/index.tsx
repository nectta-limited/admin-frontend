import React, { ReactNode, useState } from "react";
import {
  FilterFn,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RankingInfo, rankItem, compareItems } from "@tanstack/match-sorter-utils";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import styles from "./CustomTable.module.scss";
import CustomBtn from "../CustomBtn";
import { useRouter } from "next/router";

type Props = {
  data: any[];
  columns: any[];
  title?: string | ReactNode;
  search?: boolean;
  isLoading?: boolean;
  plural: string;
  singular: string;
  link?: string;

  totalCount: number;

  pageSize: number;
  pageIndex: number;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  pagination: PaginationState;

  // rowClickAction?: (val: any) => void;
  // searchPlaceholder?: string;
  // handleSetDateRange?: (val: string) => void;
  // dateRange?: string;
  // fromDate?: string;
  // toDate?: string;
  // handleSetFromDate?: (val: string) => void;
  // handleSetToDate?: (val: string) => void;
  // excelFormatIndex?: number;
  // excelFormat?: boolean;
  // canSelectRows?: boolean;
  // setSelectedRowsCount?: (value: number) => void;
  // setSelectedRows?: (value: Record<string, boolean>) => void;
};

const createPaginationArray = (value: number) => {
  let pageCountStart = 1;
  let pageCountEnd = 5;
  let res = [];

  if (value <= 5) {
    pageCountStart = 1;
    pageCountEnd = value < 5 ? value : 5;
  } else if (value % 5 === 0 && value !== 5) {
    pageCountStart = value - 4;
    pageCountEnd = value;
  } else {
    pageCountStart = Math.floor(value / 5) * 5 + 1;
    pageCountEnd = value;
  }

  for (let i = pageCountStart; i <= pageCountEnd; i++) {
    res.push(i);
  }
  return res;
};

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const CustomReactTable = ({
  data,
  columns,
  title,
  search,
  isLoading,
  plural,
  singular,
  link,
  totalCount,
  pageIndex,
  pageSize,
  setPagination,
  pagination,
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  const pageCount = Math.ceil(totalCount / pageSize);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    pageCount: pageCount,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
  });

  if (isLoading) {
    return (
      <Center w="full" h="full" minH="60vh">
        <Spinner color="primary" size="xl" />
      </Center>
    );
  }

  if (totalCount < 1 || !data.length) {
    return (
      <Center w="full" h="full" minH="60vh" bg="white" borderRadius={10}>
        <Box>
          <Text fontWeight={500}>There are no buses available in this module.</Text>
          <Center>
            <CustomBtn
              mt={[5]}
              maxW={250}
              mx="auto"
              onClick={() => router.push(link ?? `/${plural.toLowerCase()}/add`)}
            >
              Add a {singular}
            </CustomBtn>
          </Center>
        </Box>
      </Center>
    );
  }

  return (
    <>
      <Flex w="full" align="center" justify="space-between" mb={[3, 4]}>
        <Flex align="center" gap={2}>
          <Text color="primary" fontSize={34} fontWeight="700">
            {totalCount}
          </Text>
          <Text>{totalCount === 1 ? singular : plural}</Text>
        </Flex>

        <Flex align="center" gap={1.5}>
          <Text color="blackFour">Search</Text>

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </Flex>
      </Flex>

      <Box mt={title ? [6, 8, 10] : search ? 3 : 0} maxW="full" w="full">
        <Box className={styles.container} overflowX="scroll" maxW="full" w="full">
          {isLoading ? (
            <Center py="8">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              <Table fontFamily="kanit" variant="unstyled" position="relative">
                <Thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id} borderBottom="2px solid #3E3E3E">
                      {headerGroup.headers.map((header) => (
                        <Th
                          key={header.id}
                          color="blackFour"
                          fontSize={15}
                          textTransform="capitalize"
                          py={[4]}
                          fontFamily="kanit"
                        >
                          {header.isPlaceholder ? null : (
                            <Box
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick: header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {{
                                asc: " 🔼",
                                desc: " 🔽",
                              }[header.column.getIsSorted() as string] ?? null}
                            </Box>
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>

                <Tbody>
                  {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id} bg="#fbfbfb">
                      {row.getVisibleCells().map((cell) => (
                        <Td key={cell.id} color="blackFour" fontSize={15} fontFamily="kanit">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Td>
                      ))}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Flex
                w="full"
                px={[4, 5]}
                py={[4]}
                bg="#fbfbfb"
                align="center"
                justifyContent="space-between"
                direction={["column", "row"]}
                // direction={["column"]}
              >
                <Flex gap={2}>
                  <Text color="blackFour" fontSize={14}>
                    Rows per page
                  </Text>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                      table.setPageSize(Number(e.target.value));
                    }}
                    className="tableSelect"
                  >
                    {[1, 2, 3, 4].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <Text fontSize={14} color="blackFour">
                    showing {table.getState().pagination.pageIndex + 1} to {table.getPageCount()} of{" "}
                    {totalCount} entries
                  </Text>
                </Flex>

                <Flex align="center">
                  <Button
                    color="black"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    fontFamily="kanit"
                    fontSize={["0.875rem", "1rem"]}
                    fontWeight="500"
                    _hover={{
                      opacity: "0.7",
                    }}
                    _disabled={{
                      opacity: 0.4,
                    }}
                  >
                    Previous
                  </Button>

                  {createPaginationArray(table.getPageCount()).map((i) => (
                    <Text
                      key={i}
                      border={i === pageIndex + 1 ? "1px solid #2F5CAF" : "1px solid transparent"}
                      borderRadius={3}
                      px="2.5"
                      py="0.5"
                      fontSize={14}
                      onClick={() => table.setPageIndex(i - 1)}
                      cursor="pointer"
                    >
                      {i}
                    </Text>
                  ))}

                  <Button
                    color="black"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    fontFamily="kanit"
                    fontSize={["0.875rem", "1rem"]}
                    fontWeight="500"
                    _hover={{
                      opacity: "0.7",
                    }}
                    _disabled={{
                      opacity: 0.4,
                    }}
                  >
                    Next
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="searchInput"
    />
  );
}

export default CustomReactTable;
