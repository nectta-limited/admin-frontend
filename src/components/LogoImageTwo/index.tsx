import React from "react";
import { Link } from "@chakra-ui/next-js";
import LogoIconTwo from "../icons/LogoIconTwo";

interface Props {
  size?: number;
  color?: string;
}

const LogoImageTwo = ({ size = 110, color = "#2F5CAF" }: Props) => {
  return (
    <Link href="#" border="1px solid red">
      <LogoIconTwo fontSize={size} color={color} />
    </Link>
  );
};

export default LogoImageTwo;
