const dummyJsonApi = {
    fetchAllProducts: async () => {
        const res = await fetch('https://dummyjson.com/products?&limit=8&skip=1');
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
        const res = await fetch("https://dummyjson.com/products")
        const result = await res.json()
        return result.filter((product) => product.title.toLowerCase().includes(query))
    },
}

export default dummyJsonApi