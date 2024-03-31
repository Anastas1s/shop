import React, {useEffect, useState} from "react";
import "./Card.css"
import {useParams} from "react-router";

type TRating = {
    count: number,
    rate: number,
}

type TProduct = {
    id: number,
    title: string,
    category: string,
    image: string,
    price: number,
    description: string,
    rating: TRating
}
const Card = () => {
    const {id} = useParams()
    const [product, setProduct] = useState<TProduct>()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/' + id)
            .then((res) => res.json())
            .then((json) => setProduct(json))
            .catch((err) => console.log(err))
    }, [id])

    return (
        <div className="Card-container">
            <div className="Card">
                <div className="Product-item">
                    <h2>{product?.title}</h2>
                    <div className="Card-description">{product?.description}</div>
                    <img width="200px" height="250px" src={product?.image} alt={product?.title}/>
                    <h2 className="Card-price">{product?.price} $</h2>
                    <div>Рейтинг товара: {product?.rating?.rate}</div>
                    <div>Количество на складе: {product?.rating?.count}</div>
                </div>
            </div>
        </div>
    )
}

export default Card