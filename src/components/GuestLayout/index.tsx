import { Box, Container } from "@chakra-ui/react";
import Head from "next/head";
import React, { PropsWithChildren, useEffect } from "react";
import LogoImage from "../LogoImage";
import styles from "./GuestLayout.module.scss";
import { NECTTA_ADMIN_USER } from "@/constants";
import { useAppSelector } from "@/hooks/reduxHooks";
import { useRouter } from "next/router";

interface Props extends PropsWithChildren {
  removeBg?: boolean;
}

const GuestLayout: React.FC<Props> = ({ removeBg, children }) => {
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    if (user || localStorage?.getItem(NECTTA_ADMIN_USER)) {
      router.replace("/dashboard");
    }
  }, [user, router]);

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
