import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface Props {
  deleteAction: (id: number) => void;
  deactivateAction: (id: number, isActive: boolean) => void;
  id: number;
  isActive: boolean;
}

const DriverTableActionButton = ({ deactivateAction, deleteAction, id, isActive }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <Menu isOpen={isMenuOpen} onClose={closeMenu} onOpen={openMenu} strategy="fixed">
      <MenuButton
        as={Button}
        bg={"transparent"}
        color={"primary"}
        border={"1px solid #2F5CAF"}
        borderRadius="5"
        fontWeight="500"
        fontSize={["0.875rem", "1rem"]}
        minW="100"
        w="full"
        fontFamily="kanit"
        transition="all .2s ease-in-out"
        _hover={{
          color: "white",
          bg: "primary",
          border: "1px solid transparent",
        }}
      >
        Actions <TriangleDownIcon fontSize={8} ml="4" mb="0.5" />
      </MenuButton>
      <MenuList bg="white">
        <MenuItem
          px="4"
          py="2"
          bg="transparent"
          className="appHoverTwo"
          justifyContent="center"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>View more info</Text>
        </MenuItem>
        <MenuItem
          px="4"
          py="2"
          bg="transparent"
          className="appHoverTwo"
          justifyContent="center"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>View location</Text>
        </MenuItem>
        <MenuItem
          px="4"
          py="2"
          bg="transparent"
          className="appHoverTwo"
          justifyContent="center"
          onClick={() => router.push(`/drivers/edit/${id}`)}
        >
          <Text>Edit driver info</Text>
        </MenuItem>
        <MenuItem
          px="4"
          py="2"
          bg="transparent"
          className="appHoverTwo"
          justifyContent="center"
          onClick={() => deactivateAction(id, isActive)}
        >
          <Text>{isActive ? `Deactivate driver` : `Activate driver`}</Text>
        </MenuItem>
        <MenuItem
          px="4"
          py="2"
          bg="transparent"
          className="appHoverTwo"
          justifyContent="center"
          onClick={() => deleteAction(id)}
        >
          <Text>Delete driver</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DriverTableActionButton;
