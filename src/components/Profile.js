// import React, { useState, useContext } from 'react';
// import UserContext from '../contexts/UserContext';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCog } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // const { user } = useContext(UserContext);
  // const [editMode, setEditMode] = useState(false);

  // const handleEditModeToggle = () => {
  //   setEditMode(!editMode);
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Update user information on the back end.
  //   // You may need to pass the updated user object to this function.
  //   console.log('Update user information');
  // };

  const [fonts, setFonts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/fonts')
      .then(response => {
        setFonts(response.data);
      });
  }, []);

  console.log(fonts.length)

  return (
    // <div className="flex flex-col gap-4 w-96 mx-auto">
    //   {user ? (
    //     <>
    //       <div className="flex justify-between items-center">
    //         <h1>Profile</h1>
    //         <button onClick={handleEditModeToggle}>
    //           <FontAwesomeIcon icon={faCog} size="lg" />
    //         </button>
    //       </div>

    //       {editMode ? (
    //         <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>

    //           <div>
    //             <label htmlFor="username">Username:</label>
    //             <input type="text" className="form-control" id="username" defaultValue={user.username} />
    //           </div>

    //           <div>
    //             <label htmlFor="email">Email:</label>
    //             <input type="email" className="form-control" id="email" defaultValue={user.email} />
    //           </div>

    //           <div>
    //             <label htmlFor="subscription">Subscription:</label>
    //             <input type="text" className="form-control" id="subscription" defaultValue={user.subscription} />
    //           </div>

    //           <button type="submit">Update Information</button>
    //         </form>
    //       ) : (
    //         <>
    //           <p>Username: {user.username}</p>
    //           <p>Email: {user.email}</p>
    //           <p>Subscription: {user.subscription}</p>
    //         </>
    //       )}

    //     </>
    //   ) : (
    //     <p>Please sign in to view your profile.</p>
    //   )}

    // </div>

    <div>
      {fonts.map(font => (
        <p style={{ fontFamily: font }} key={font}>{font}</p>
      ))}
    </div>

  );
};

export default Profile;
