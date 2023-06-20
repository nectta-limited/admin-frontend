import { Box, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface Props {
  link: string;
  count: number;
  title: string;
}

const DataBox = ({ link, count, title }: Props) => {
  return (
    <Box bg="white" className="dataBox" borderRadius={6} px={[4]} py={[4]}>
      <Text color="greyOne" fontSize={[16, null, 17]}>
        Registered {title}
      </Text>

      <Flex justify="space-between" align="center" my="2">
        <Text color="blackTwo" fontSize={[32]} fontWeight={"600"}>
          {count}
        </Text>
        <Box borderRadius="full" h={"50px"} w={"50px"} bg="orangeOne"></Box>
      </Flex>

      <Link href={link}>
        <Text color="primary" textDecoration="underline" _hover={{ opacity: "0.75" }}>
          View all {title}
        </Text>
      </Link>
    </Box>
  );
};

export default DataBox;
