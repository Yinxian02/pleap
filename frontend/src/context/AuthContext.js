import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        email: '',
        password: '',
        roles: [], // An array of roles
        accessToken: ''
      });

    // Define the setAuth function to update the auth state.
    // const updateAuth = (newAuthData) => {
    //     setAuth(newAuthData);
    // };

    // const checkUserRole = (roleToCheck) => {
    //     return auth.roles.includes('Admin') && auth.roles.includes(roleToCheck);
    // };

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;