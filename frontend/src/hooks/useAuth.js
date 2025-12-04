// Mock Data Version

// import { useSelector, useDispatch } from 'react-redux';
// import { logout as logoutAction } from '../store/slices/authSlice';

// export const useAuth = () => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);

//   const mockAuth = {
//     token: "mock-token",
//     user: { id: 1, role: "user", name: "Divya Darsheel Sharma" },
//     isLoading: false,
//     error: null,
//     isAuthenticated: true,
//   };
//   const currentAuth = auth.user ? auth : mockAuth;

//   return {
//     ...currentAuth,
//     logout: () => dispatch(logoutAction()),
//     isAdmin: currentAuth.user?.role === 'admin',
//     isUser: currentAuth.user?.role === 'user',
//     isRescuer: currentAuth.user?.role === 'rescuer',
//   };
// };


// Real Data Version

import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return {
    ...auth,
    logout: () => dispatch(logoutAction()),
    isAdmin: auth.user?.role === 'admin',
    isUser: auth.user?.role === 'user',
    isRescuer: auth.user?.role === 'rescuer',
  };
};