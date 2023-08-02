import * as React from "react";
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Item } from "../../components/item"
import { useCart } from "../../context/cart"
import dummyJsonApi from "../../services/dummyJsonApi"
import InfiniteScroll from 'react-infinite-scroll-component';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [query] = useSearchParams();
    const { addToCart } = useCart()

    const searchQuery = query.get('q');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const data = searchQuery ? await dummyJsonApi.fetchProductsBySearchQuery(searchQuery) : await dummyJsonApi.fetchAllProducts();
            console.log('effect', data)
            const products = data.products
            setProducts(products);
            setLoading(false)
        }
        fetchProducts().catch(console.error)
    }, [searchQuery])

    const fetchData = () => {
        setPage(page + 1);
        const fetchApi = async () => {
            const res = await dummyJsonApi.fetchAllProducts()
            const data = res.products
            console.log('fetchapi', data)
            setProducts(products.concat(data))
        }
        fetchApi()
    }

    if (!loading && searchQuery && !products.length) {
        return (
            <div className="container">
                <div className="product py-2">
                    <div className="details p-3">No products found matching your query.</div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="container">
                <div className="products my-5">
                    <div className="grid">

                        {loading ? (
                            <div className="loader" />
                        ) : (
                            products.map(product => (
                                <Item key={product.id} data={product} addToCart={() => addToCart(product)} />
                            ))

                        )}

                        <InfiniteScroll
                            dataLength={products.length}
                            next={fetchData}
                            hasMore={true}
                            loader={<h4>Loading...</h4>}
                        >
                        </InfiniteScroll>

                    </div>
                </div>
            </div >
        </>
    )
}

export default Products 