import api from "../config/api";

// Retrieve Childs Gift List
const getChildGiftList = async (childUid) => {
  const response = await api.get(`/lettertosanta/${childUid}`);
  return response.data;
};

// Add Child Gift List
const addChildGiftList = async (childUid, giftList) => {
  const response = await api.post(`/lettertosanta/${childUid}`, giftList);
  return response.data;
};

// Add Child to dashboard
const addChildDB = async (userId, childData) => {
  const response = await api.post(`/dashboard/${userId}/addchild`, childData);
  return response.data;
};
// Get children from dashboard
const getChildren = async (userId) => {
  const response = await api.get(`/dashboard/${userId}`);
  return response.data;
};

export { getChildGiftList, addChildGiftList, addChildDB, getChildren };