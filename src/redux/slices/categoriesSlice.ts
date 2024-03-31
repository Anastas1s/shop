import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk<CategoryData>(
    'category/fetchCategories',
    async () => {
        try {
            const {data} = await axios.get('https://fakestoreapi.com/products/categories')
            return data
        } catch (e) {
            console.log(e)
            throw e
        }
    }
)

type CategoryData = string[]

type TInitialState = {
    items: CategoryData,
    selectedCategory: string
}

const initialState: TInitialState = {
    items: [],
    selectedCategory: 'all',
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})
export const {setSelectedCategory} = categoriesSlice.actions
export default categoriesSlice.reducer