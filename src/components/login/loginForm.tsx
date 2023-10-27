"use client";
import Input from "../Input";
import styles from "./styles.module.scss";
import { IloginInput } from "@/interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUser } from "@/contexts/userContext";

const LoginForm = () => {
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
    <form className={styles.loginForm} onSubmit={handleSubmit(submit)}>
      <div className={styles.formContainer}>
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
      </div>
    </form>
  );
};
export default LoginForm;
