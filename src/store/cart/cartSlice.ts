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
    removeFromCart: (state, action: PayloadAction<CartItem['id']>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    increaseCount: (state, action: PayloadAction<CartItem['id']>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) item.count++
    },
    decreaseCount: (state, action: PayloadAction<CartItem['id']>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) {
        item.count--
        if (item.count === 0) {
          state.items = state.items.filter((i) => i.id !== action.payload)
        }
      }
    },
  },
  selectors: {
    getCartItems: (state) => state.items,
  },
})

export const {
  addToCart,
  increaseCount,
  decreaseCount,
  removeFromCart,
  clearCart,
} = cartSlice.actions
export const { getCartItems } = cartSlice.selectors
export default cartSlice.reducer
