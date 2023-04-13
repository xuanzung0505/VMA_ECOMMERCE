import { useEffect, useState } from 'react'
import { ChevronLeft } from './ChevronLeft'
import { ChevronRight } from './ChevronRight'

const { data } = require('./banner')

const PromotionSectionCarousel = () => {
  const [bannerList, setBannerList] = useState(data)
  const [index, setIndex] = useState(0)

  const classNamePrefix = 'promotion__section__banner__carousel'

  const transitionDuration = 5000

  useEffect(() => {
    const lastIndex = bannerList.length - 1
    if (index < 0) setIndex(lastIndex)
    if (index >= bannerList.length) setIndex(0)
  }, [index, bannerList])

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex(index + 1)
    }, transitionDuration)

    return () => {
      clearInterval(interval)
    }
  }, [index])

  console.log('index:' + index)
  return (
    <div className="promotion__section__banner__carousel">
      {bannerList.map((item: any, id: any) => {
        let position = 'next_slide'

        if (id == index) position = 'current_slide'
        if (
          (index > 0 && id == index - 1) ||
          (index == 0 && id == bannerList.length - 1)
        )
          position = 'prev_slide'

        return (
          <div
            key={item.id}
            className={`promotion__section__banner__carousel__item ${position}`}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            {/* <img src={item.image}></img> */}

            {position == 'current_slide' && (
              <>
                <ChevronLeft
                  parent={classNamePrefix}
                  handleClick={() => setIndex(index - 1)}
                />
                <ChevronRight
                  parent={classNamePrefix}
                  handleClick={() => setIndex(index + 1)}
                />
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

export { PromotionSectionCarousel }
