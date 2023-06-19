import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import React, { PropsWithChildren } from "react";
import LogoImage from "../LogoImage";
import styles from "./GuestLayout.module.scss";

interface Props extends PropsWithChildren {
  removeBg?: boolean;
}

const GuestLayout: React.FC<Props> = ({ removeBg, children }) => {
  return (
    <>
      <Head>
        <title>Nectta Admin</title>
      </Head>
      <Box className={styles.bg}>
        <Box className={styles.bg_overlay}>
          <Container maxW="1100" h="full">
            <Box position="absolute">
              <LogoImage />
            </Box>
            {children}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default GuestLayout;
