"use client";
import { IloginInput } from "@/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../Input";
import { useUser } from "@/contexts/userContext";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IloginInput>();
  const { login } = useUser();

  const submit: SubmitHandler<IloginInput> = (formData) => {
    login(formData);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        label="Seu usuário cadastrado"
        type="text"
        register={register("name")}
        defaultValue=""
        error={errors.name}
      />
      <Input
        label="Sua senha"
        type="password"
        register={register("password")}
        defaultValue=""
        error={errors.password}
      />
      <button type="submit">Entrar</button>
    </form>
  );
};
