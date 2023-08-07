import { Link } from "react-router-dom"

const Item = ({ data, addToCart }) => {

    const { id, images, title, brand, category, price } = data

    return (
        <div className="card">
            <div className="grid">
                <div className="image">
                    <img src={images[0]} alt="" />
                </div>
                <div className="title">
                    <Link to={`/product/${id}`} className="link titleLink">
                        {title}
                    </Link>
                    <div>
                        <span className="detail-brand">{brand}</span>
                        <span className="detail">{category}</span>
                    </div>
                </div>
                <div className="flex">
                    <span className="price" style={{ marginRight: 15 }}>
                        ${price}
                    </span>
                    <div className="cart" onClick={addToCart}>
                        <img className="cartImg" src="/cart.svg" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Item } 