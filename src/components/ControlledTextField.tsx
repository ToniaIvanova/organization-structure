import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { OutlinedInputProps, TextField } from "@mui/material";
import { ControlledFieldProps } from "../types";

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  name,
  label,
  inputProps,
  type = "",
  autoComplete = "",
}: ControlledFieldProps<TFieldValues> & {
  inputProps?: OutlinedInputProps;
  type?: string;
  autoComplete?: string;
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field, fieldState: { invalid, error } }) => {
        return (
          <TextField
            variant="outlined"
            label={label ?? name}
            error={invalid}
            helperText={error?.message || ''}
            fullWidth
            InputProps={inputProps}
            type={type}
            autoComplete={autoComplete}
            {...field}
          />
        );
      }}
    />
  );
};
