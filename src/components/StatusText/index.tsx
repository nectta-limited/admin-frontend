import { Text } from "@chakra-ui/react";
import React from "react";

const StatusText = ({ status }: { status: string }) => {
  return (
    <Text
      textTransform="capitalize"
      color={status === "active" ? "greenOne" : "redOne"}
      fontSize={15}
      fontWeight={500}
    >
      {status}
    </Text>
  );
};

export default StatusText;
