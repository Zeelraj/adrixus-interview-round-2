const token = localStorage.getItem("token");

const registerService = async (payload) => {
  return await fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/register`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

const loginService = async (payload) => {
  return await fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/login`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

const authenticationService = async () => {
  return await fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/auth`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

const logoutService = async () => {
  return await fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/logout`, {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

export { registerService, loginService, authenticationService, logoutService };
