import { IProduct } from 'shared/interfaces'
import cl from './Rating.module.scss'

import clsx from 'clsx'

export interface RatingProps extends Pick<IProduct, 'rating'> {
  absolute?: boolean
}

export const Rating = ({ rating, absolute }: RatingProps) => {
  return (
    <div className={clsx(cl.rating, { [cl.absolute]: absolute })}>
      {rating}
      <span>
        <img src="/icons/star_icon.svg" alt="star" />
      </span>
    </div>
  )
}
