export const getUserById = async (userId: string) => {
  const fetchedUser = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await fetchedUser.json();

  return user;
};

export const getUserByUsername = async (username: string) => {
  const fetchedUser = await fetch(`/api/users/find/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await fetchedUser.json();

  return user;
};
