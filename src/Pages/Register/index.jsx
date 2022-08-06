import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, reset } from "../../reducers/auth/authSlice";
import { PASSWORD_LENGTH } from "../../utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../utils/Loader";

const Register = () => {
  const { user, loading, isError, success, message, isAuthenticated } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Variables
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    cnfPassword: "",
  });

  const { name, email, contact, password, cnfPassword } = formData;

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

  const onRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !contact || !password || !cnfPassword) {
      return toast.error("Please, fill all the Required values..!!");
    }

    if (password.length < PASSWORD_LENGTH) {
      return toast.error(
        `Password must be greater then or equal to ${PASSWORD_LENGTH} characters..!!`
      );
    }

    if (password !== cnfPassword) {
      return toast.error("Confirm Password must be same as Password..!!");
    }

    dispatch(registerUser({ name, email, contact, password }));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-center mt-24">
        <div className="w-full max-w-sm rounded overflow-hidden shadow-lg p-4 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">Register</h1>
          <div className="mb-2"></div>
          <div>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John Doe"
                required
                value={name}
                onChange={onChange}
              />
            </div>
            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@example.com"
                required
                value={email}
                onChange={onChange}
              />
            </div>
            {/* Contact Field */}
            <div className="mb-6">
              <label
                htmlFor="contact"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Contact*
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1234567890"
                required
                value={contact}
                onChange={onChange}
              />
            </div>
            {/* password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password*
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
            {/* Cnf password Field */}
            <div className="mb-6">
              <label
                htmlFor="cnfPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Confirm Password*
              </label>
              <input
                type="password"
                id="cnfPassword"
                name="cnfPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="######"
                required
                value={cnfPassword}
                onChange={onChange}
              />
            </div>
          </div>
          {/* Register Button */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={onRegister}
          >
            Register Now
          </button>
          {/* Login Page Link */}
          <p className="text-right">
            Already a User?
            <Link to={"/login"} className="underline ml-1">
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
