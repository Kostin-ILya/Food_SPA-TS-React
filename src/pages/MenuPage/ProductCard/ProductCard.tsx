import { Link } from 'react-router-dom'

import cl from './ProductCard.module.scss'

export interface ProductCardProps {
  name: string
  description: string
  price: number
  image: string
  id: number
  rating: number
}

export const ProductCard = ({
  name,
  description,
  price,
  image,
  //  id,
  rating,
}: ProductCardProps) => {
  return (
    <Link to={`/menu/${name}`} className={cl.productCard}>
      <div
        className={cl.imgContainer}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={cl.price}>
          {price} <span>₽</span>
        </div>

        <button className={cl.buyIcon}>
          <img src="/icons/buy_icon.svg" alt="Buy" />
        </button>

        <div className={cl.rating}>
          {rating}
          <span>
            <img src="/icons/star_icon.svg" alt="star" />
          </span>
        </div>
      </div>

      <div className={cl.info}>
        <h3>{name}</h3>

        <p>{description}</p>
      </div>
    </Link>
  )
}
