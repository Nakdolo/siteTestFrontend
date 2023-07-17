import React, { useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../Logo.svg";
import { ReactComponent as Flag } from "../FlagPack.svg";

const Register = () => {
  const [fullName, setName] = useState("");
  const [email, setLogin] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
        fullName,
      });
      //
      navigate("/home", { state: { email } });
      console.log("Успешно");

      //
    } catch (error) {
      console.error("Ошибка входа:", error);
      setError("Не коректные данные");
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
              fontFamily: "PT Root UI",
              fontWeight: "700",
              color: "#161D30",
            }}
          >
            Регистрация
          </h1>
        </div>
        <div className="field">
          <input
            className="input-field"
            type="text"
            placeholder="Имя"
            value={fullName}
            onChange={handleNameChange}
          />
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
                icon={showPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
              />
            </button>
          </div>
        </div>
        <div className="button-container">
          <button className="login-button" onClick={handleRegister}>
            Зарегистрироваться
          </button>
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        </div>
        <div className="register-text">
          <span>Есть аккаунт ?</span>
          <a
            style={{ color: "rgba(75, 123, 245, 1)", marginLeft: "4px" }}
            href="/"
          >
            Войти
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
