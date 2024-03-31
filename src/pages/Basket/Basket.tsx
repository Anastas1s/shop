import React, {useEffect} from "react";
import "./Basket.css";
import {useDispatch, useSelector} from "react-redux";
import {loadBasketFromLS} from "../../redux/slices/basketSlice";
import Product from "../../components/Product/Product";
import {AppDispatch, RootState} from "../../redux/store";

const Basket = () => {
    const productsBasket = useSelector((state: RootState) => state.basketShop.basketLs)
    const total = useSelector((state: RootState) => state.basketShop.totalPrice)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch]);


    const BasketUI = productsBasket.map(({id, title, price, image}) => {
        return (
            <Product
                title={title}
                price={price}
                image={image}
                key={id}
                id={id}
            />
        )
    })


    return (
        <>
            <h2>Итоговая сумма: {total.toFixed(2)} $</h2>
            <div className="Basket-container">
                {BasketUI}
            </div>
        </>
    )
}

export default Basket