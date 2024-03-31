import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_API = 'https://fakestoreapi.com/products'

export const getProductsFromCategories = createAsyncThunk<TItems[], string>(
    'category/fetchProductFromCategories',
    async (category: string) => {
        try {
            const response = await axios.get<TItems[]>(
                category === 'all'
                    ? BASE_API
                    : BASE_API + `/category/${category}`
            )
            return response.data
        } catch (e) {
            console.log(e)
        }
    }
)

enum Status {
    LOADING = "loading",
    SUCCESS = "success",
    ERROR = "error",
}

type TItems = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}

type TInitialState = {
    items: TItems[]
    status: Status
}

const initialState: TInitialState = {
    items: [],
    status: Status.LOADING
}

const productSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        setSearchWord: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item =>
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            )
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsFromCategories.pending, (state) => {
            state.status = Status.LOADING
        })
        builder.addCase(getProductsFromCategories.fulfilled, (state, action) => {
            state.items = action.payload
            state.status = Status.SUCCESS
        })
        builder.addCase(getProductsFromCategories.rejected, (state) => {
            state.status = Status.ERROR
        })
    }
})

export const {setSearchWord} = productSlice.actions
export default productSlice.reducer