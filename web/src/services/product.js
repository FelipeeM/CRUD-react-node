import apiService from ".";
const ENDPOINT_PATH = "/product";

const ProductService = {
    create: async (product) => apiService.post(ENDPOINT_PATH, product),

    update: async (product) => apiService.put(ENDPOINT_PATH, product),

    delete: async (id) => apiService.delete(`${ENDPOINT_PATH}/${id}`),

    findAll: async () => apiService.get(`${ENDPOINT_PATH}/findAll`),
};

export default ProductService;
