import { createContext, useContext, useState } from "react";
import users from "../data/users.json";
import employees from "../data/employees.json";
import timeRecords from "../data/time_records.json";

const AuthContext = createContext();

// fake auth
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const userExists = (username) => {
    return users.find(u => [u.username, u.email].includes(username));
  };

  const login = (username, password) => {
    const findUser = userExists(username);
    if (findUser && findUser.password === password) {
      const employeeData = employees.find(e => e.user_id === findUser.id);
      const timeRecordsData = timeRecords.filter(t => t.employee_id === employeeData.id);
      const userData = {
        ...findUser,
        employee_info: {
          ...employeeData
        },
        time_records: timeRecordsData
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, userExists }}>
      { children }
    </AuthContext.Provider>
  )
};

export const useAuth = () => {
  return useContext(AuthContext);
};