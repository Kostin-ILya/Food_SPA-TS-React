export interface IProduct {
  id: number
  name: string
  price: number
  ingredients: string[]
  image: string
  rating: number
}

export type CartItem = Pick<IProduct, 'id' | 'name' | 'price' | 'image'> & {
  count: number
}
