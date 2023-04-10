import { useEffect, useState } from 'react'

const { data } = require('./data')

const PromotionSectionCarousel = () => {
  const [bannerList, setBannerList] = useState(data)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const lastIndex = bannerList.length - 1
  }, [])

  return (
    <>
      {bannerList.map((item: any, id: any) => {
        let position = 'next_slide'

        if (id == index) position = 'current_slide'
        if (
          (index > 0 && id == index - 1) ||
          (id == bannerList.length - 1 && index == 0)
        )
          position = 'prev_slide'

        return (
          <div
            key={index}
            className={`promotion__section__banner__carousel__item ${position}`}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            {/* <img src={item.image}></img> */}
          </div>
        )
      })}
    </>
  )
}

export { PromotionSectionCarousel }
