const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const validateToken = async (token) => {
  try {
    // First, try to decode the token to get user data
    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userData = decoded.payload || decoded;

    // Then validate the token with the backend
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    // Return the user data from the token
    return userData;
  } catch (err) {
    console.error('Token validation error:', err);
    throw new Error('Unauthorized');
  }
};

const userService = {
  index,
  validateToken,
};

export default userService;
