import { createContext, useContext, useEffect, useReducer } from 'react'

const CartContext = createContext(null)

const IVA_RATE = 0.19
const SHIPPING_FLAT = 12000
const FREE_SHIPPING_THRESHOLD = 150000

function loadInitialState() {
  try {
    const saved = localStorage.getItem('cgl_cart')
    return saved ? JSON.parse(saved) : { items: [], coupon: null }
  } catch {
    return { items: [], coupon: null }
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.weight === action.payload.weight
      )
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i === existing ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          )
        }
      }
      return { ...state, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId
            ? { ...i, quantity: Math.max(1, action.payload.quantity) }
            : i
        )
      }
    case 'APPLY_COUPON':
      return { ...state, coupon: action.payload }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null }
    case 'CLEAR_CART':
      return { items: [], coupon: null }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadInitialState)

  useEffect(() => {
    localStorage.setItem('cgl_cart', JSON.stringify(state))
  }, [state])

  const addItem = (product, quantity = 1) =>
    dispatch({
      type: 'ADD_ITEM',
      payload: { ...product, quantity, cartId: `${product.id}-${product.weight}` }
    })

  const removeItem = (cartId) => dispatch({ type: 'REMOVE_ITEM', payload: cartId })
  const updateQuantity = (cartId, quantity) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartId, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  const applyCoupon = (coupon) => dispatch({ type: 'APPLY_COUPON', payload: coupon })
  const removeCoupon = () => dispatch({ type: 'REMOVE_COUPON' })

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const discount = state.coupon
    ? state.coupon.type === 'percent'
      ? subtotal * (state.coupon.value / 100)
      : state.coupon.value
    : 0
  const taxableBase = Math.max(subtotal - discount, 0)
  const iva = taxableBase * IVA_RATE
  const shipping = state.items.length === 0 || taxableBase >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT
  const total = taxableBase + iva + shipping
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)

  const value = {
    items: state.items,
    coupon: state.coupon,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    iva,
    shipping,
    total,
    itemCount
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de un CartProvider')
  return ctx
}
