import React, { useState } from "react";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import nafLogo from "../../assets/images/naf.jpg";
import "../../assets/styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { rol, user, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
      }

      const data = await response.json();
      const { email } = data;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const token = await userCredential.user.getIdToken();

      const res = await fetch(
        "http://localhost:3001/api/users/dashboard-access",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (!res.ok) {
        throw new Error("No autorizado");
      }

      const result = await res.json();

      login(userCredential.user);
      navigate(result.redirect);
    } catch (err) {
      console.error("Error de login:", err);
      setError("Usuario o contraseña incorrectos.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Enlace de restablecimiento enviado al correo electrónico");
      setShowResetForm(false);
    } catch (error) {
      setError("Error al enviar el enlace. Revisa el correo.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="logo-container">
          <img src={nafLogo} alt="Logo NAF" className="logo" />
          <h1>Núcleo de Apoyo Fiscal</h1>
          <p className="subtitle">Núcleo de Apoyo Fiscal</p>
          <p className="tagline">Facultad de Ciencias Administrativas - ESPE</p>
        </div>
      </div>

      <div className="login-right">
        {showResetForm ? (
          <form onSubmit={handlePasswordReset} className="login-form">
            <h2>Restablecer contraseña</h2>
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
            </div>
            {error && <p className="error-message">{error}</p>}
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
</div>

<div className="button-container">
  <button type="button" onClick={() => navigate("/register")}>
    Registrarse
  </button>
</div>

<div className="button-container">
  <button type="button" onClick={() => navigate("/")}>
    Volver al inicio
  </button>
</div>

{error && <p className="error-message">{error}</p>}


            {error && <p className="error-message">{error}</p>}

            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
