import React from "react";
import LogoIcon from "../icons/LogoIcon";
import { Link } from "@chakra-ui/next-js";

interface Props {
  size?: number;
  color?: string;
}

const LogoImage = ({ size = 140, color = "white" }: Props) => {
  return (
    <Link href="#">
      <LogoIcon fontSize={size} color={color} />
    </Link>
  );
};

export default LogoImage;
