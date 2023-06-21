import { TriangleDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const DriverTableActionButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          px={[4]}
          bg="transparent"
          className="appHoverTwo"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>View current bus location</Text>
        </MenuItem>
        <MenuItem
          px={[4]}
          bg="transparent"
          className="appHoverTwo"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>Edit bus info</Text>
        </MenuItem>
        <MenuItem
          px={[4]}
          bg="transparent"
          className="appHoverTwo"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>Deactivate bus</Text>
        </MenuItem>
        <MenuItem
          px={[4]}
          bg="transparent"
          className="appHoverTwo"
          // onClick={() => router.push("/dashboard/change-password")}
        >
          <Text>Delete bus</Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default DriverTableActionButton;
