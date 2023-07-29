import authInstance from '../../api/instance/authInstance';

export const createProductAPI = async (productData) => {
  try {
    const response = await authInstance.post('/product', productData);

    return response;
  } catch (error) {
    console.log(error);
  }
};
