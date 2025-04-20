// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const RequireAuth = ( { allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         allowedRoles.includes(auth?.role)
//             ? <Outlet />
//             : <Navigate to="/login" state={{from : location}} replace />
//     );
// }

// export default RequireAuth;


// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const RequireAuth = ( { allowedRoles }) => {
//     const { auth } = useAuth();
//     const location = useLocation();

//     return (
//         allowedRoles.includes(auth?.role)
//             ? <Outlet />
//             : <Navigate to="/login" state={{from : location}} replace />
//     );
// }

// export default RequireAuth;


import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.role && allowedRoles.includes(auth.role) ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
// Compare this snippet from anti-counterfeit-product-identification-system-using-blockchain-main/identeefi-frontend-react/src/components/RequireAuth.js:
// import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';