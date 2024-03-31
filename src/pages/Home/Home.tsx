import React, {useEffect} from "react";
import "./Home.css";
import Product from "../../components/Product/Product";
import Categories from "../../components/Categories/Categories";
import {getProductsFromCategories} from "../../redux/slices/productsSlice";
import {useDispatch, useSelector} from "react-redux";
import {loadBasketFromLS} from "../../redux/slices/basketSlice";
import {AppDispatch, RootState} from "../../redux/store";

const Home = () => {
    const products = useSelector((state: RootState) => state.items.items)
    const category = useSelector((state: RootState) => state.categories.selectedCategory)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(loadBasketFromLS())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getProductsFromCategories(category))
    }, [category]);


    const productsData = products?.map(({title, price, id, image}) => (
        <Product
            title={title}
            price={price}
            image={image}
            key={id}
            id={id}
        />
    ))

    return (
        <>
            <div className="Home-container">
                <Categories/>
                <div className="Product-container">
                    {products.length ? productsData : <h1>Нет товаров...</h1>}
                </div>
            </div>
        </>
    )
}
export default Home