export const getDataFromLocalStorage = (dataName) => {
  const result = localStorage.getItem(dataName);
  const user = result ? JSON.parse(result) : [];
  return user;
};
export const addDataToLocalStorage = (dataName, data) => {
  localStorage.setItem(dataName, JSON.stringify(data));
};

export const removeDataFromLocalStorage = (dataName) => {
  localStorage.removeItem(dataName);
};
