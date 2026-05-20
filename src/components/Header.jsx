import { useEffect, useState } from "react";

import styles from "./Header.module.css";
import logo from "../assets/logo.png";

import Button from "./UI/Button";

import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

export default function Header({
  isAuthenticated = false,
}) {
  const navigate = useNavigate();

  const [userName, setUserName] =
    useState("Admin");

  useEffect(() => {
    async function loadUser() {
      if (!isAuthenticated) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("name")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(error.message);
        return;
      }

      if (data?.name) {
        console.log(userName);
        setUserName(data.name);
      }
    }

    loadUser();
  }, [isAuthenticated]);

  async function handleLogout() {
    await supabase.auth.signOut();

    window.location.href = "/login";
  }

  return (
    <header className={styles.header}>
      <Link
        to={isAuthenticated ? "/dashboard" : "/"}
        className={styles.logo}
      >
        <img
          src={logo}
          alt="Educação Corporativa"
        />
      </Link>

      <div className={styles.actions}>
        {isAuthenticated ? (
          <>
            <div className={styles.user}>
              <div className={styles.avatar}>
                {userName.charAt(0).toUpperCase()}
              </div>

              <div className={styles.userInfo}>
                <strong>{userName}</strong>
                <span>Administrador</span>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              Sair
            </Button>
          </>
        ) : (
          <div className={styles.nav}>
            <Link
              to="/sobre"
              className={styles.navLink}
            >
              Sobre
            </Link>

            <Link
              to="/login"
              className={styles.loginLink}
            >
              <Button
                type="button"
                variant="secondary"
                size="sm"
              >
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}