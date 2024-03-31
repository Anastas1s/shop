import React, {useEffect, useState} from "react";
import "./Categories.css"
import {getCategories, setSelectedCategory} from "../../redux/slices/categoriesSlice";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/store";

const Categories: React.FC = () => {
    const [selCategory, setSelCategory] = useState<string>("")
    const categories = useSelector((state: RootState) => state.categories.items)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const handleCategory = (category: string) => {
        setSelCategory(category)
        dispatch(setSelectedCategory(category))
    }
    const categoriesList = categories?.map((category: string, idx: number) =>
        <option key={idx} value={category}>
            {category}
        </option>
    )

    return (
        <>
            <select
                className="Select"
                value={selCategory}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCategory(e.target.value)
                }
            >
                <option>all</option>
                {categoriesList}
            </select>
        </>
    )
}
export default Categories