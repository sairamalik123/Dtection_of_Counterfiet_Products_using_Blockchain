// // import {createContext, useState} from "react";

// // const AuthContext = createContext({});

// // export const AuthProvider = ({children}) => {
// //     const [auth, setAuth] = useState({});

// //     return (
// //         <AuthContext.Provider value={{auth, setAuth}}>
// //             {children}
// //         </AuthContext.Provider>
// //     );
// // }

// // export default AuthContext;



// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState(() => {
//         // Retrieve auth state from localStorage
//         const storedAuth = localStorage.getItem("auth");
//         return storedAuth ? JSON.parse(storedAuth) : {};
//     });

//     useEffect(() => {
//         // Save auth state to localStorage whenever it changes
//         localStorage.setItem("auth", JSON.stringify(auth));
//     }, [auth]);

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
// // Compare this snippet from anti-counterfeit-product-identification-system-using-blockchain-main/identeefi-frontend-react/src/hooks/useAuth.js:
// // import { useContext } from "react";
// // import AuthContext from "../context/AuthProvider";




import {createContext, useState} from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
