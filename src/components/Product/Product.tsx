import React from "react";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import "./Product.css";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, deleteProduct, loadBasketFromLS} from "../../redux/slices/basketSlice";
import {AppDispatch, RootState} from "../../redux/store";

type TProps = {
    id: number,
    title: string,
    price: number,
    image: string
}

const Product = (props: TProps) => {
    const {
        title,
        price,
        image,
        id,
    } = props

    const dispatch: AppDispatch = useDispatch()
    const [count, setCount] = useState<number>(0)
    const basketLs = useSelector((state: RootState) => state.basketShop.basketLs)

    useEffect(() => {
        const findProductFromBasket = basketLs.find((item) => item.id === id)
        if (findProductFromBasket) {
            setCount(findProductFromBasket.count)
        }
    }, [basketLs, id]);

    const addBasket = () => {
        setCount(count + 1)
    }

    const deleteBasket = () => {
        count > 0 && setCount(count - 1)
        dispatch(deleteProduct(id))
    }

    useEffect(() => {
        const data = {id: id, title: title, price: price, count: count, image: image}
        count > 0 && dispatch(addProduct(data))
        dispatch(loadBasketFromLS())
    }, [count]);

    return (
        <div className="Product-item">
            <Link to={`/card/${id}`} className="Product-title">{title}</Link>
            <img width="200px" height="250px" src={image} alt={title}/>
            <h2>{count > 0 ? (price * count).toFixed(2) : price} $</h2>
            <div className="Add-product">
                <button
                    className="Btn"
                    onClick={addBasket}
                >
                    +
                </button>
                <button
                    className="Btn"
                    onClick={deleteBasket}
                >
                    -
                </button>
            </div>
            <div className="Count">Количество: {count}
            </div>
        </div>
    )
}

export default Product