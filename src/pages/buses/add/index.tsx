import AuthLayout from "@/components/AuthLayout";
import CustomBtn from "@/components/CustomBtn";
import CustomInput from "@/components/CustomInput";
import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const AddBusPage: NextPage = () => {
  return (
    <AuthLayout>
      <Heading fontSize={[20, 26]} color="blackOne">
        Add a Bus
      </Heading>

      <Box bg="white" borderRadius={10} w="full" mt={[4, null, 6]}>
        <Box borderBottom="1px dotted #ddd">
          <Text fontSize={[16, 18]} py={[4, null, 5]} px={[4, null, 6]}>
            Enter the information below to add a bus
          </Text>
        </Box>

        <form>
          <Box px={[4, null, 6]} py={[4, null, 5]}>
            <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={[4, 6]}>
              <CustomInput id="busNumber" label="Bus number" isRequired />
              <CustomInput id="busType" label="Bus type" isRequired />
              <CustomInput id="busColor" label="Bus color" isRequired />
            </Grid>

            <CustomBtn mt={[8, 10]} mb={10} maxW={["full", null, 200]} type="submit">
              Submit
            </CustomBtn>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default AddBusPage;
