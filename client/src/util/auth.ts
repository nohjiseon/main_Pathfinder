export const getAccessToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  return token;
};
export const getUserId = () => {
  const id = Number(localStorage.getItem("memberId"));

  if (!id) {
    return null;
  }

  return id;
};
