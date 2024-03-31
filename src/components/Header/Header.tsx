import React, {ChangeEvent} from "react";
import "./Header.css";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProductsFromCategories, setSearchWord} from "../../redux/slices/productsSlice";
import {AppDispatch, RootState} from "../../redux/store";

const Header: React.FC = () => {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const total = useSelector((state: RootState) => state.basketShop.totalBasketCount)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            dispatch(getProductsFromCategories("all"))
        } else {
            dispatch(setSearchWord(e.target.value))
        }
    }

    return (
        <div className="Header">
            <h1
                className="Title-shop"
                onClick={() => {
                    navigate("/")
                }}
            >
                Online Shop
            </h1>

            <input
                placeholder="Search..."
                className="Input-search"
                onChange={handleChange}
            />

            <Link to="/basket"
                  className="Basket-count"
            >
                Корзина: {total}
                {/*<h3 className="Basket-btn">Корзина: {total}</h3>*/}
            </Link>
        </div>
    )
}

export default Header