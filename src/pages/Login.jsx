import { useState } from "react";
import styles from "./Login.module.css";

import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log({
      email,
      senha,
    });

    // depois entra a chamada da API:
    // login(email, senha)
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <span className={styles.badge}>Área administrativa</span>

          <h1>Entrar na plataforma</h1>

          <p>
            Acesse para cadastrar e editar jornadas corporativas.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="E-mail"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />

          <Button size="lg">
            Entrar
          </Button>
        </form>
      </section>
    </main>
  );
}