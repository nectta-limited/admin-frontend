import { Button, ButtonProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

interface CustomBtnProps extends ButtonProps {
  isError?: boolean;
  light?: boolean;
}

const CustomBtn = ({ children, isError, isLoading, light, ...rest }: CustomBtnProps) => {
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) {
      setShowSpinner(true);
    } else {
      setShowSpinner(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError) {
      setShowSpinner(false);
    }
  }, [isError]);

  return (
    <Button
      p="6"
      bg={light ? "transparent" : "primary"}
      color={light ? "primary" : "white"}
      border={light ? "1px solid #2F5CAF" : "1px solid transparent"}
      borderRadius="5"
      fontWeight="500"
      fontSize={["0.875rem", "1rem"]}
      minW="140"
      w="full"
      fontFamily="kanit"
      transition="all .2s ease-in-out"
      _hover={{
        color: light ? "white" : "primary",
        bg: light ? "primary" : "transparent",
        border: light ? "1px solid transparent" : "1px solid #2F5CAF",
      }}
      isLoading={showSpinner}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomBtn;
