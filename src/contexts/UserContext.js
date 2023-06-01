// UserContext.js
import { createContext, useState, useEffect } from "react";
// import io from "socket.io-client";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  // const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // useEffect(() => {
  //   const socket = io(backendURL);
  //   console.log("User Context socket connected");
  //   socket.on('connect', () => {});

  //   socket.on('subscription_updated', (data) => {
  //     console.log("subscription_updated event received");
  //     if (data.user_id === user.id) {
  //       console.log("Updating user subscription");
  //       setUser({ ...user, subscription: data.subscription });
  //     }
  //   });

  //   // Clean up the effect by disconnecting from the socket when the component unmounts
  //   return () => {
  //     console.log("User Context socket disconnected");
  //     socket.disconnect();
  //   };
  // }, [user, backendURL]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
