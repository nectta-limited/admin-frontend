import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  Icon,
  IconButton,
  IconProps,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiBarChartAlt2, BiBusSchool, BiLogOut } from "react-icons/bi";
import { MdPersonOutline, MdPeopleOutline, MdOutlineSchool, MdLockOutline } from "react-icons/md";
import styles from "./AuthLayout.module.scss";
import { ChevronDownIcon, CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import useMediaQuery from "@/hooks/useMediaQuery";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/router";
import SidebarLink from "../SidebarLink";
import { useAppDispatch, useAppSelector, useGetUser } from "@/hooks/reduxHooks";
import { NECTTA_ADMIN_USER } from "@/constants";
import { setUser } from "@/redux/auth.slice";
import LogoutModal from "../LogoutModal";

const NAV_LINKS = [
  { name: "Dashboard", icon: (props?: IconProps) => <Icon as={BiBarChartAlt2} {...props} /> },
  { name: "Buses", icon: (props?: IconProps) => <Icon as={BiBusSchool} {...props} /> },
  { name: "Drivers", icon: (props?: IconProps) => <Icon as={MdPersonOutline} {...props} /> },
  { name: "Parents", icon: (props?: IconProps) => <Icon as={MdPeopleOutline} {...props} /> },
  { name: "Students", icon: (props?: IconProps) => <Icon as={MdOutlineSchool} {...props} /> },
];

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const isBigScreen = useMediaQuery("(min-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenLogout, onOpen: onOpenLogout, onClose: onCloseLogout } = useDisclosure();
  const hamburgerBtnRef = useRef(null);
  const user = useAppSelector((state) => state.auth.user);
  const userData = useGetUser();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (user) return;
    const browserUser = localStorage?.getItem(NECTTA_ADMIN_USER);
    if (browserUser) {
      dispatch(setUser(browserUser));
      return;
    }
    router.replace("/login");
  }, [user, router, dispatch]);

  return (
    <>
      <Head>
        <title>Nectta Admin</title>
      </Head>
      <Box w="full" h="full" minH="100vh" bg="white">
        <LogoutModal isOpen={isOpenLogout} onClose={onCloseLogout} />
        <Flex
          w="full"
          justify="space-between"
          align="center"
          px={[4, 6, 8]}
          className={styles.top_bar}
          h="8vh"
        >
          <Box w={115} h={30} border="1px solid black">
            <Text textAlign="center" color="primary">
              nectta
            </Text>
          </Box>

          <Flex align="center">
            {!isBigScreen ? (
              <IconButton
                aria-label="open hamburger menu"
                icon={<HamburgerIcon color="black" fontSize={20} />}
                size="xs"
                px={[1, null, 0]}
                ref={hamburgerBtnRef}
                onClick={onOpen}
                className="appHoverTwo"
              />
            ) : null}

            <IconButton
              aria-label="toggle notifications"
              icon={<Icon as={AiOutlineBell} color="black" fontSize={20} />}
              size="xs"
              px={[2, null, 0]}
              className="appHoverTwo"
            />

            <Flex align="center">
              <Menu isOpen={isMenuOpen} onClose={closeMenu} onOpen={openMenu}>
                {isBigScreen ? (
                  <MenuButton
                    as={Button}
                    rightIcon={
                      <Flex align="center">
                        <Icon as={FaUserCircle} color="black" fontSize={28} />
                        <ChevronDownIcon color="black" />
                      </Flex>
                    }
                    color="black"
                    fontFamily={"kanit"}
                    fontSize={16}
                    className="appHoverTwo"
                  >
                    {userData?.data?.email}
                  </MenuButton>
                ) : (
                  <MenuButton
                    as={IconButton}
                    aria-label="open menu"
                    icon={
                      <Flex align="center">
                        <Icon as={FaUserCircle} color="black" fontSize={28} />
                        <ChevronDownIcon color="black" />
                      </Flex>
                    }
                    className="appHoverTwo"
                  ></MenuButton>
                )}
                <MenuList bg="white">
                  <MenuItem
                    px={[4, 8]}
                    py="4"
                    bg="transparent"
                    className="appHoverTwo"
                    borderBottom={"1px solid #eee"}
                    onClick={() => router.push("/dashboard/change-password")}
                  >
                    <Icon as={MdLockOutline} color="primary" />
                    <Text ml="2" fontWeight="500">
                      Change Password
                    </Text>
                  </MenuItem>
                  <MenuItem
                    px={[4, 8]}
                    py="4"
                    bg="transparent"
                    className="appHoverTwo"
                    onClick={onOpenLogout}
                  >
                    <Icon as={BiLogOut} color="redOne" />
                    <Text ml="2" fontWeight="500" color="redOne">
                      Logout
                    </Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>

        <Grid w="full" h="full" minH="92vh" templateColumns={["1fr", null, "1.5fr 8.5fr"]}>
          {isBigScreen ? (
            <Box overflowY="hidden" pt={8}>
              <VStack w="full" alignItems="flex-start">
                {NAV_LINKS.map((link) => (
                  <SidebarLink
                    isActive={Boolean(pathname.startsWith(`/${link.name.toLowerCase()}`))}
                    link={link}
                    key={link.name}
                  />
                ))}
              </VStack>
            </Box>
          ) : null}

          <Box bg="pageBG" h="full" w="full" pt={[4, 6, 8]} px={[4, 6, 8]}>
            {children}
          </Box>
        </Grid>

        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={hamburgerBtnRef}
          size="xs"
        >
          <DrawerOverlay display={["flex", null, "none"]} />
          <DrawerContent display={["flex", null, "none"]} position="relative" bg="white">
            <IconButton
              icon={<CloseIcon fontSize="0.75rem" color="black" />}
              aria-label="close mobile menu"
              position="absolute"
              top="4"
              right="2"
              borderRadius="full"
              size="sm"
              onClick={onClose}
            />
            <DrawerBody pt={12} px="0">
              <VStack w="full" alignItems="flex-start" spacing={4}>
                {NAV_LINKS.map((link) => (
                  <SidebarLink
                    isActive={Boolean(pathname.startsWith(`/${link.name.toLowerCase()}`))}
                    link={link}
                    key={link.name}
                  />
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default AuthLayout;
