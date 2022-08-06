import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Table from "../../Components/Table";
import { logoutUser } from "../../reducers/auth/authSlice";
import { usersList } from "../../reducers/user/userSlice";
// import users from "../../users.json";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const currentUser = user;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersList());
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Welcome, {currentUser.name}</h1>
      {/* Logout Button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onLogout()}
      >
        Logout
      </button>
      <div className="mt-5">
        <h3 className="text-2xl mb-2">Users</h3>
        <Table />
      </div>
    </div>
  );
};

export default Dashboard;
