import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/auth/get-user/${user?.googleId}`);
      // , {
      //   headers: { authorization: `Bearer ${user?.token}` },
      // }
      setUser(data);
    };

    fetchData();
  }, [user?.googleId, user?.token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
