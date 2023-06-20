import { FormControl, FormControlProps, FormLabel, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useMemo, useRef } from "react";
import Select, { Props as SelectProps, SelectInstance } from "react-select";

type SelectOptionType = {
  label?: string;
  value?: string;
  name?: string;
};

interface CustomSelectProps extends FormControlProps {
  label: string;
  id: string;
  select?: boolean;
  selectOptions?: SelectOptionType[];
  selectProps?: SelectProps;
  errorText?: string | undefined | null;
  selectLoading?: boolean;
  optionsText?: string;
  triggerValueChange?: string;
}

const CustomSelect = ({
  label,
  id,
  select,
  selectOptions,
  selectProps,
  errorText,
  selectLoading,
  optionsText,
  triggerValueChange,
  ...rest
}: CustomSelectProps) => {
  const formattedOptions = useMemo(() => {
    const options = selectOptions?.map((option) => ({
      value: (option.value ?? option.name) as string,
      label: (option.label ?? option.name) as string,
      ...option,
    }));

    return options;
  }, [selectOptions]);

  return (
    <FormControl {...rest}>
      <FormLabel
        htmlFor={id}
        color="blackThree"
        fontSize="1rem"
        fontWeight="400"
        fontFamily="kanit"
      >
        {label}
      </FormLabel>
      <Select
        options={formattedOptions}
        id={id}
        isClearable
        isSearchable
        isLoading={selectLoading}
        loadingMessage={() => <Spinner size="sm" />}
        noOptionsMessage={() => <Text>{optionsText || "No options available"}</Text>}
        {...selectProps}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            fontFamily: `'Kanit', sans-serif`,
          }),
          control: (provided, { isDisabled }) => ({
            ...provided,
            padding: ".35rem .5rem",
            borderRadius: "5px",
            color: "#000",
            fontSize: "0.875rem",
            background: isDisabled ? "#F9F9FB" : "white",
            border: "1px solid #c4c4c4",
            fontFamily: `'Kanit', sans-serif`,
          }),
          placeholder: (provided) => ({
            ...provided,
            fontFamily: `'Kanit', sans-serif`,
            color: "black",
          }),
          option: (provided) => ({
            ...provided,
            color: "black",
            fontFamily: `'Kanit', sans-serif`,
          }),
        }}
      />

      {errorText ? (
        <Text color="redOne" mt="1" fontSize={["0.75rem", "0.875rem"]}>
          {errorText}
        </Text>
      ) : null}
    </FormControl>
  );
};

export default CustomSelect;
