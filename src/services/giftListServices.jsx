import api from "../config/api";

// Add a Gift List
const addGiftList = async (userData, userId) => {
  const response = await api.post(`/giftlist/${userId}`, userData);
  return response.data;
};
// Update Gift List with patch
const updateGiftList = async (userData, userId) => {
  const response = await api.patch(`/giftlist/${userId}`, userData);
  return response.data;
};
// Retrieve Gift List
const getGiftList = async (userId) => {
  const response = await api.get(`/giftlist/${userId}`);
  return response.data;
};
// Delete Gift List
const deleteGiftList = async (userId, uid) => {
  const response = await api.delete(`/giftlist/${userId}/${uid}`);
  return response.data;
};

export { addGiftList, updateGiftList, getGiftList, deleteGiftList };