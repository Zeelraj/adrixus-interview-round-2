const token = localStorage.getItem("token");

const usersListService = async () => {
  return await fetch(`${process.env.REACT_APP_API_SERVER}/api/v1/users/list`, {
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

export { usersListService };
