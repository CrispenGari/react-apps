import React from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL, KEYS } from "../constants";

const AuthContext = React.createContext({
  jwt: null,
  me: null,
  loading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    jwt: null,
    me: null,
    loading: false,
  });

  const { data: me, isLoading: loadingMe } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const p = await SecureStore.getItemAsync(KEYS.JWT);
      if (!p) return null;
      const { jwt } = JSON.parse(p);
      const result = await fetch(`${API_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${jwt}`,
        },
        credentials: true,
      });
      const me = await result.json();
      return me;
    },
  });

  React.useEffect(() => {
    setAuthState((s) => ({ ...s, loading: loadingMe, me }));
  }, [loadingMe, me]);

  React.useEffect(() => {
    (async () => {
      // Load token on startup
      const data = await SecureStore.getItemAsync(KEYS.JWT);
      if (data) {
        const object = JSON.parse(data);
        // Set our context state
        setAuthState((s) => ({
          ...s,
          jwt: object.jwt,
        }));
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      // fetch POST request to /login
      const result = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: true,
      });
      const json = await result.json();
      if (json.error) {
        return { error: json.error };
      }
      setAuthState({
        jwt: json.jwt,
      });
      await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
      return json;
    } catch (e) {
      return { error: e.message };
    }
  };
  const register = async (email, password) => {
    try {
      const result = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: true,
      });
      const json = await result.json();
      if (json.error) {
        return { error: json.error };
      }
      setAuthState({
        jwt: json.jwt,
      });
      await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
      return json;
    } catch (e) {
      return { error: e.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(KEYS.JWT);
    setAuthState({
      jwt: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
