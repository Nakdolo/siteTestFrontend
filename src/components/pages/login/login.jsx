import React, { useState } from "react";
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../Logo.svg";
import { ReactComponent as Flag } from "../FlagPack.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setLogin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });
      navigate("/home", { state: { email } });
      console.log("Успешно");
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Неправильный логин или пароль ");
    }
  };

  return (
    <div>
      <div className="container">
        <Logo style={{ marginLeft: "47%", width: "40px", height: "40px" }} />
        <Flag
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            marginLeft: "30%",
          }}
        />
      </div>
      <div className="box">
        <div>
          <h1
            style={{
              fontSize: "36px",
              lineHeight: "43.2px",
              fontWeight: "700",
              color: "#161D30",
            }}
          >
            Вход
          </h1>
        </div>

        <div className="field">
          <input
            className="input-field"
            type="text"
            placeholder="Почта"
            value={email}
            onChange={handleLoginChange}
          />
        </div>

        <div className="field">
          <div className="password-field">
            <input
              className="input-field"
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className="password-toggle-button"
              onClick={handleTogglePassword}
            >
              <FontAwesomeIcon
                style={{ color: "#4b7bf5" }}
                icon={showPassword ? faEye : faEyeSlash}
                className="password-toggle-icon"
              />
            </button>
          </div>
        </div>

        <div className="checkbox-container">
          <div className="checkbox-labels">
            <input
              type="checkbox"
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <span className="label-text">Запомнить пароль</span>
            <a style={{ color: "rgba(75, 123, 245, 1)" }} href="">
              Забыли пароль?
            </a>
          </div>
        </div>

        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Войти
          </button>
        </div>
        <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        <div className="register-text">
          <span>Нет аккаунта?</span>
          <a
            style={{
              color: "rgba(75, 123, 245, 1)",
              marginLeft: "4px",
            }}
            href="/auth/register"
          >
            Регистрация
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
