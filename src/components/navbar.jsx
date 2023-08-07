import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ onSearch, cartItemCount }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length) {
      navigate(`/?q=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="wrapper">
      <header className="container">
        <div className="header py-2">
          <div className="grid flex" >
            <Link to="#" onClick={() => navigate(-1)} className="link">
              <img className="icons" src="/arrow.svg" alt="arrow" />
            </Link>
            <Link to="/" className="link">
              <img className="icons" src="/home.svg" alt="home" />
            </Link>

            <h1 className="brand">E-commerce</h1>
            <div className="formContainer">
              <form className="search">
                <div className="form-control">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                  />
                </div>
                <button type="submit" className="search-btn" onClick={handleSubmit} >
                  Search
                </button>
              </form>
            </div>
            <Link to="/cart" className="link headerCart">
              <img className="icon-cart" src="/cart.svg" alt="cart" />
              {cartItemCount > 0 && (
                <div className="cartCounter">{cartItemCount <= 9 ? cartItemCount : "9+"}</div>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default NavBar 