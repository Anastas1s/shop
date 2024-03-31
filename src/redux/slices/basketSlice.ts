import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type TItem = {
    id: number,
    title: string,
    price: number,
    count: number,
    image: string
}

type TInitialState = {
    basketLs: TItem[],
    totalBasketCount: number,
    basketCount: number,
    totalPrice: number
}

const initialState: TInitialState = {
    basketLs: [],
    totalBasketCount: 0,
    basketCount: 0,
    totalPrice: 0
}

export const basketSlice = createSlice({
    name: "basketShop",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<TItem>) => {
            const {id, price, count, image, title} = action.payload

            localStorage.setItem(id.toString(), JSON.stringify({title, price: price, count: count, image}))

            const keyIdLs = Object.keys(localStorage)

            state.basketLs = keyIdLs.map((id) => {
                const product = JSON.parse(localStorage.getItem(id))
                return {id: Number(id), ...product}
            })
            state.totalBasketCount = state.basketLs?.reduce((acc, item) => {
                return acc + item.count
            }, 0)
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            const id = action.payload.toString()
            const itemString = localStorage.getItem(id)
            const item = JSON.parse(itemString)

            if (item?.count > 1) {
                item.count -= 1
                item.price = item.price * item.count
            } else {
                localStorage.removeItem(id)
                state.totalBasketCount = 0
            }

        },
        loadBasketFromLS: (state) => {
            const keyIdLs = Object.keys(localStorage)

            state.basketLs = keyIdLs.map((id) => {
                const product = JSON.parse(localStorage.getItem(id))
                return {id: Number(id), ...product}
            })
            state.totalPrice = state.basketLs?.reduce((acc, item) => {
                return acc + item.price * item.count
            }, 0)
        }
    }
})

export const {addProduct, deleteProduct, loadBasketFromLS} = basketSlice.actions
export default basketSlice.reducer