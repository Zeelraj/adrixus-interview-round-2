import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, reset } from "../../reducers/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../utils/Loader";

const Login = () => {
  const { user, loading, isError, success, message, isAuthenticated } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Variables
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  // Notifications
  const notify = (message) => toast.error(message);

  const { id, password } = formData;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (success || user) {
      navigate("/", { replace: true });
    }

    dispatch(reset());
  }, [user, isError, success, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onLogin = (e) => {
    e.preventDefault();

    if (!id || !password) {
      return notify("Please, fill all the Required values");
    }

    dispatch(loginUser({ id, password }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-center mt-24">
        <div className="w-full max-w-sm rounded overflow-hidden shadow-lg p-4 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">Login</h1>
          <div className="mb-2"></div>
          <div>
            {/* Contact Field */}
            <div className="mb-6">
              <label
                htmlFor="id"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email Address / Contact
              </label>
              <input
                type="text"
                id="id"
                name="id"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@example.com / 1234567890"
                required
                value={id}
                onChange={onChange}
              />
            </div>
            {/* password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="######"
                required
                value={password}
                onChange={onChange}
              />
            </div>
          </div>
          {/* Login Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={onLogin}
          >
            Login Now
          </button>
          {/* Register Page Link */}
          <p className="text-right">
            Not a User?
            <Link to={"/register"} className="underline ml-1">
              Register Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
