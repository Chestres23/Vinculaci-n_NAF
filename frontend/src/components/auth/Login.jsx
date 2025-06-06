import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      console.log("Attempting to login with username:", username);
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      const { email, grupo } = data;

      console.log("Login successful, signing in with Firebase"); // Log de inicio de sesión exitoso
      await signInWithEmailAndPassword(auth, email, password);

      if (grupo === 1) {
        console.log("Redirecting to admin dashboard"); // Log de redirección a admin
        navigate("/dashboard-admin/home");
      } else if (grupo === 2) {
        console.log("Redirecting to general dashboard"); // Log de redirección a general
        navigate("/dashboard-general/home");
      } else {
        throw new Error("Grupo no válido");
      }
    } catch (error) {
      console.error("Error signing in:", error); // Log de error
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Enlace de reestablecimiento enviado al correo electrónico");
      setShowResetForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo-container">
          <img
            src="/Logo-circulo-Militar.png"
            alt="Círculo Militar Logo"
            className="logo"
          />
          <h1>Gestor Documental</h1>
          <p className="subtitle">Círculo Militar</p>
          <p className="tagline">¡Mucho más que un buen club!</p>
        </div>
      </div>
      <div className="login-right">
        {showResetForm ? (
          <form onSubmit={handlePasswordReset} className="login-form">
            <h2>Reestablecer contraseña</h2>
            <div className="form-group">
              <label htmlFor="reset-email">Correo electrónico</label>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="button-container">
              <button type="submit">Enviar enlace</button>
              <button type="button" onClick={() => setShowResetForm(false)}>
                Cancelar
              </button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="login-form">
            <h2>Iniciar sesión</h2>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="nombre.apellido"
                required
              />
            </div>
            <div className="form-group password-container">
              <label htmlFor="password">Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••"
                  required
                />
                <span
                  className="password-toggle-icon"
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
              </div>
            </div>
            <div className="form-group">
              <a
                href="#"
                onClick={() => setShowResetForm(true)}
                className="forgot-password"
              >
                Olvidé mi contraseña
              </a>
            </div>
            <div className="button-container">
              <button type="submit">Ingresar</button>
              {error && <p className="error-message">{error}</p>}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
