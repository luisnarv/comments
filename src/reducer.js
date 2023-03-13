import { createSlice } from '@reduxjs/toolkit'
import { getItem, setItem } from './utils/localStorage'

const slice = createSlice({
    name: 'store',
    initialState: {
        token: getItem('token') || undefined,
        name: getItem('name') || undefined,
        avatar: getItem('avatar') || undefined,
        role: getItem('role') || undefined,
        cart: getItem('cart') || [],
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            setItem('token', action.payload)
        },
        setName(state, action) {
            state.name = action.payload
            setItem('name', action.payload)
        },
        setAvatar(state, action) {
            state.avatar = action.payload
            setItem('avatar', action.payload)
        },
        setRole(state, action) {
            state.role = action.payload
            setItem('role', action.payload)
        },
        addToCart(state, action) {
            state.cart.push(action.payload)
        },
        removeFromCart(state, action) {
            state.cart = state.cart.filter(c => c !== action.payload)
        },
        emptyCart(state) {
            state.cart = []
        }
    },
})

export const {
    setToken, setName, setAvatar, setRole,
    addToCart, removeFromCart, emptyCart
} = slice.actions

export default slice.reducer