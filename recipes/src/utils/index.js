export const KEYS = {
  FAVORITES: "fav:",
};

export const store = async (key, value) => {
  try {
    await localStorage.setItem(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

export const retrieve = async (key) => {
  try {
    const value = await localStorage.getItem(key);
    return value;
  } catch (error) {
    return null;
  }
};

export const del = async (key) => {
  try {
    await localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};
