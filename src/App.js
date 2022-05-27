import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from "./context/userContext"
import { API, setAuthToken } from "./config/api"
import { Home, Admin, AddArtist, AddMusic, User, ChatAdmin, ChatUser, Error } from './pages/Index'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const navigate = useNavigate();
  // Init user context
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/auth');
    } else {
      if (state.user.status === 'admin') {
        navigate('/admin-complain');
      } else if (state.user.status === 'customers') {
        navigate('/');
      }
    }
  }, [state]);

  // Create function for "check user token"
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/pay' element={<User />} />
        <Route path='/transactions' element={<Admin />} />
        <Route path='/user-chat' element={<ChatUser />} />
        <Route path='/admin-chat' element={<ChatAdmin />} />
        <Route path='/add-artist' element={<AddArtist />} />
        <Route path='/add-music' element={<AddMusic />} />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
