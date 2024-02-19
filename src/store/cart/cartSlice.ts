import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem } from 'shared/interfaces'

export interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'count'>>) => {
      const exist = state.items.find((i) => i.id === action.payload.id)
      exist ? exist.count++ : state.items.push({ ...action.payload, count: 1 })
    },
    // removeFromCart: (state, action) => {
    //   state.items = state.items.filter((item) => item.id !== action.payload)
    // },
  },
  selectors: {
    getCartItems: (state) => state.items,
  },
})

export const { addToCart } = cartSlice.actions
export const { getCartItems } = cartSlice.selectors
export default cartSlice.reducer
