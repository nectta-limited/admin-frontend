import CustomInput from "@/components/CustomInput";
import { createWardSchema } from "@/validation/parents.validation";
import { Grid } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { IWardItem } from "../../add";

interface Props {
  wardInfo: IWardItem;
  updateWardName: (id: number, name: string) => void;
  updateWardGrade: (id: number, grade: string) => void;
}

const Ward = ({ wardInfo, updateWardGrade, updateWardName }: Props) => {
  return (
    <form>
      <Grid templateColumns={["1fr", null, "1fr 1fr"]} gap={4}>
        <CustomInput
          id="name"
          label={`Name of child ${wardInfo.id}`}
          inputProps={{
            value: wardInfo.name,
            onChange: (e) => updateWardName(wardInfo.id, e.target.value),
          }}
          isRequired
        />

        <CustomInput
          id="grade"
          label={`Class/grade of child ${wardInfo.id}`}
          inputProps={{
            value: wardInfo.grade,
            onChange: (e) => updateWardGrade(wardInfo.id, e.target.value),
          }}
          isRequired
        />
      </Grid>
    </form>
  );
};

export default Ward;
