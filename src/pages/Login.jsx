import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  LuArrowLeft,
  LuKeyRound,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

import styles from "./Login.module.css";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Subtitle from "../components/UI/Subtitle";

import logo from "../assets/logo.png";

import { supabase } from "../services/supabase";
import Title from "../components/UI/Title";
import Badge from "../components/UI/Badge";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  async function handleLogin(event) {

    event.preventDefault();

    setLoading(true);

    setMessage("");

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password: senha,

      });

    setLoading(false);

    if (error) {

      if (
        error.message.includes("Invalid login credentials")
      ) {

        setMessage(
          "E-mail ou senha inválidos."
        );

        return;
      }

      setMessage(
        "Erro ao realizar login."
      );

      return;
    }

    navigate("/dashboard");
  }

  async function handleForgotPassword() {

    if (!email) {

      setMessage(
        "Digite seu e-mail para recuperar a senha."
      );

      return;
    }

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/login`,
        }
      );

    if (error) {

      setMessage(
        "Erro ao enviar recuperação de senha."
      );

      return;
    }

    setMessage(
      "Enviamos um link de recuperação para seu e-mail."
    );
  }

  return (
    <main className={styles.page}>

      <section className={styles.card}>
        <div className={styles.nav}>
          <Link
            to="/"
            className={styles.close}
          >
            <LuArrowLeft />
          </Link>

          <img className={styles.logo}
            src={logo}
            alt="Educação Corporativa"
          />
        </div>


        <div className={styles.header}>

          <Badge>
            Área administrativa
          </Badge>

          <Title size="bg">
            Entrar na plataforma
          </Title>

          <Subtitle variant="lignt" size="md">
            Acesse para cadastrar e editar
            jornadas corporativas.
          </Subtitle>


        </div>

        <form
          className={styles.form}
          onSubmit={handleLogin}
        >

          <Input
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <div className={styles.passwordField}>

            <Input
              label="Senha"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Digite sua senha"
              value={senha}
              onChange={(event) =>
                setSenha(event.target.value)
              }
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {
                showPassword
                  ? <LuEyeOff />
                  : <LuEye />
              }

            </button>

          </div>

          {
            message && (
              <Subtitle
                size="sm"
                variant="warning"
              >
                {message}
              </Subtitle>
            )
          }
          <div className={styles.rememberRow}>

            <label className={styles.checkbox}>

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() =>
                  setRememberMe(!rememberMe)
                }
              />

              <span>
                Lembrar acesso
              </span>

            </label>

          </div>
          <Button
            size="lg"
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Entrando..."
                : "Entrar"
            }
          </Button>

        </form>

        <button
          type="button"
          onClick={handleForgotPassword}
          className={styles.forgot}
        >

          <LuKeyRound />

          Esqueci minha senha

        </button>

      </section>

    </main>
  );
}