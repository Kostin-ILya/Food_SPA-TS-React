export interface IProduct {
  id: number | string
  name: string
  price: number
  ingredients: string[]
  image: string
  rating: number
  description: string
}

export type CartItem = Pick<IProduct, 'id' | 'name' | 'price' | 'image'> & {
  count: number
}
