import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null); // USAMOS 'rol' EN LUGAR DE 'grupo'
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const sessionTimeout = 3600 * 1000;

  const resetTimer = useCallback(() => {
    clearTimeout(window.sessionTimer);
    window.sessionTimer = setTimeout(() => {
      handleLogout();
    }, sessionTimeout);
  }, []);

  const handleLogout = async () => {
  await signOut(auth); // Cierra la sesión de Firebase
  setUser(null);
  setRol(null);
  setUserData(null);
  setIsAuthResolved(false); // 🔄 Esto reinicia el estado de autenticación
};



  const login = (firebaseUser) => {
    setUser(firebaseUser); // esto activa el onAuthStateChanged
  };

  useEffect(() => {
  const fetchRol = async (uid) => {
  try {
    const res = await fetch(`http://localhost:3001/api/users/user-role/${uid}`);
    if (!res.ok) throw new Error(`HTTP ${res.status} - UID no encontrado`);
    const data = await res.json();
    if (!data.rol) throw new Error("Respuesta no contiene 'rol'");
    setRol(data.rol);
  } catch (err) {
    console.error("❌ Error al obtener rol:", err.message);
    setRol(null);
  }
};


  const fetchUserData = async (uid) => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${uid}`);
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error("❌ Error al obtener datos del usuario:", err);
      setUserData(null);
    }
  };

  const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
    console.log("🟡 [onAuthStateChanged] Usuario detectado:", firebaseUser);

    if (firebaseUser) {
      setUser(firebaseUser);
      try {
        await Promise.all([
          fetchRol(firebaseUser.uid),
          fetchUserData(firebaseUser.uid),
        ]);
        console.log("✅ Usuario y rol cargados");
      } catch (err) {
        console.error("❌ Error general al cargar usuario/rol:", err);
      }

      resetTimer();
      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);
    } else {
      console.log("🔴 Sesión cerrada o no iniciada");
      setUser(null);
      setRol(null);
      setUserData(null);
      clearTimeout(window.sessionTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    }

    setIsAuthResolved(true); // ✅ Solo se resuelve cuando termina todo
    setLoading(false);
  });

  return () => {
    unsubscribe();
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
  };
}, [resetTimer]);


  if (loading)
    return <div className="p-4 text-center">Cargando aplicación...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        rol,
        userData,
        handleLogout,
        login,
        isAuthResolved,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
