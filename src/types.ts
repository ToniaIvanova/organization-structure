import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
} from "react-hook-form";


export type User = {
  id: string;
  name: string;
  manager: User | null;
  subordinates: User[];
  createdAt: Date;
  updatedAt: Date;
}

export type ErrorType = {
  message: string;
}

export type AssignManagerResponseDto = {
  prevManager: User;
  manager: User;
  subordinate: User;
}


export type ControlledFieldProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  defaultValue?: UnpackNestedValue<
    FieldPathValue<TFieldValues, FieldPath<TFieldValues>>
  >;
  name: FieldPath<TFieldValues>;
  fieldsErrors?:  null | string;
  label?: string;
};
