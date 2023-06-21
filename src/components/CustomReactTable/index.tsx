import React, { ReactNode, useState } from "react";
import {
  FilterFn,
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
  Center,
  Flex,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
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
}: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
    },
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

  if (!data.length) {
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
            {data.length}
          </Text>
          <Text>{data.length === 1 ? singular : plural}</Text>
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
