const dummyJsonApi = {
    fetchAllProducts: async (page = 0, perPage, q) => {
        const res = await fetch(`https://dummyjson.com/products?&limit=10&skip=${page}`);
        const result = res.json();
        return result;
    },
    // fetchProducts: async () => {
    //     const res = await fetch('https://dummyjson.com/products?page={page}');
    //     const result = res.json();
    //     return result;
    // },
    fetchProductById: async (productId) => {
        const res = await fetch(`https://dummyjson.com/products/${productId}`)
        const result = await res.json()
        return result
    },
    fetchProductsBySearchQuery: async (query) => {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`)
        const result = await res.json()
        return result;
    },
}

export default dummyJsonApi
