import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormControlProps,
  Text,
  Textarea,
  TextareaProps,
  InputRightElement,
  InputLeftElement,
  InputGroup,
  Flex,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export type SelectOptionType = {
  label?: string;
  value?: string;
  name?: string;
};

interface CustomInputProps extends FormControlProps {
  inputProps?: InputProps;
  label?: string;
  id: string;
  errorText?: string | undefined | null;
  box?: boolean;
  boxProps?: TextareaProps;
  leftEl?: ReactNode;
  rightEl?: ReactNode;
  topText?: ReactNode;
}

const CustomInput = ({
  inputProps,
  label,
  id,
  errorText,
  box,
  boxProps,
  leftEl,
  rightEl,
  topText,
  ...rest
}: CustomInputProps) => {
  return (
    <FormControl {...rest}>
      <Flex align="center" justifyContent="space-between">
        <FormLabel
          htmlFor={id}
          color="blackThree"
          fontSize="1rem"
          fontWeight="400"
          fontFamily="kanit"
        >
          {label}
        </FormLabel>

        {topText ? <Text fontSize={14}>{topText}</Text> : null}
      </Flex>

      <InputGroup>
        {leftEl ? (
          <InputLeftElement height="full" pl="4">
            {leftEl}
          </InputLeftElement>
        ) : null}
        {box ? (
          <Textarea
            border={"1px solid #c4c4c4"}
            borderRadius="5px"
            pr="4"
            pl="20"
            color="blackThree"
            w="full"
            fontSize="0.875rem"
            size="lg"
            fontFamily="kanit"
            id={id}
            bg={"white"}
            resize="none"
            _hover={{
              border: "1px solid #c4c4c4",
            }}
            {...boxProps}
          />
        ) : (
          <Input
            border={"1px solid #c4c4c4"}
            borderRadius="5px"
            pr={rightEl ? 12 : 4}
            pl={leftEl ? 12 : 4}
            color="blackThree"
            w="full"
            fontSize="0.875rem"
            size="lg"
            fontFamily="kanit"
            id={id}
            bg={"white"}
            _hover={{
              border: "1px solid #c4c4c4",
            }}
            {...inputProps}
          />
        )}
        {rightEl ? <InputRightElement height="full">{rightEl}</InputRightElement> : null}
      </InputGroup>

      {errorText ? (
        <Text color="redOne" mt="1" fontSize={["0.75rem", "0.875rem"]}>
          {errorText}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default CustomInput;
