import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [grupo, setGrupo] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const sessionTimeout = 3600 * 1000; // 1 hora


  const resetTimer = useCallback(() => {
    clearTimeout(window.sessionTimer);
    window.sessionTimer = setTimeout(() => {
      handleLogout();
    }, sessionTimeout);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setGrupo(null);
      setUserData(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchUserGroup = async (uid) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/user-group/${uid}`
        );
        const data = await response.json();
        setGrupo(data.grupo);
      } catch (error) {
        console.error("Error fetching user grupo:", error);
      }
    };

    const fetchUserData = async (uid) => {
      try {
        const response = await fetch(`http://localhost:3001/api/users/${uid}`);
        const data = await response.json();
        setUserData(data);
        console.log("User Data configurado en AuthContext:", data); // <-- Agrega este console.log
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchUserGroup(user.uid);
        fetchUserData(user.uid);
        resetTimer(); // Resetear el temporizador al iniciar sesión
        window.addEventListener("mousemove", resetTimer);
        window.addEventListener("keydown", resetTimer);
      } else {
        setUser(null);
        setGrupo(null);
        setUserData(null);
        clearTimeout(window.sessionTimer);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [resetTimer]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, grupo, userData, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
