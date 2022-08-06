import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routes";
import "./App.css";
import PrivateRoute from "./PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "./reducers/auth/authSlice";
import Loader from "./utils/Loader";

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authenticateUser());
    }
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    // TODO Update the Loader in the Loading
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  route.isPrivate ? (
                    <PrivateRoute>{route.element}</PrivateRoute>
                  ) : (
                    route.element
                  )
                }
              />
            );
          })}
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
