import { Link } from "@chakra-ui/next-js";
import { Flex, IconProps, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
  link: { name: string; icon: (props?: IconProps) => React.JSX.Element };
  isActive: boolean;
}

const SidebarLink = ({ link, isActive }: Props) => {
  return (
    <Link href={`/${link.name.toLowerCase()}`} key={link.name} w="full" pr={[4, 6, null, 8]}>
      <Flex
        align="center"
        gap={[2, null, null, 3]}
        py="2"
        w="full"
        pl={[4, 6, null, 8]}
        bg={isActive ? "primaryLight" : "transparent"}
        borderLeft={isActive ? "4px solid #F5AE51" : "4px solid transparent"}
        className={isActive ? undefined : "appHoverTwo"}
      >
        {link.icon({
          color: isActive ? "primary" : "black",
        })}
        <Text color={isActive ? "primary" : "black"} fontWeight={isActive ? "500" : "400"}>
          {link.name}
        </Text>
      </Flex>
    </Link>
  );
};

export default SidebarLink;
