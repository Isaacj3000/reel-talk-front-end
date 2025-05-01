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
    // Instead of a separate validate endpoint, we'll use the index endpoint
    // which will naturally validate the token through the auth middleware
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error('Unauthorized');
    }

    const data = await res.json();
    return data;
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
