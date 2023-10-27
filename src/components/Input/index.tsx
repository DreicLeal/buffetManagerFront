import { IInputProps } from "@/interface";
import { TextField } from "@mui/material";

const Input = ({ label, type, register, error, defaultValue }: IInputProps) => {
  return (
    <fieldset>
      <TextField
        type={type}
        label={label}
        {...register}
        defaultValue={defaultValue}
      />
      {error && <p>{error.message}</p>}
    </fieldset>
  );
};
export default Input;
