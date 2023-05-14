import { PromotionSectionCarousel } from './PromotionSectionCarousel'
import '../../../../assets/styles/App/PromotionSection.scss'
const { data } = require('./bannerOther')
const { logo } = require('./logo')

const PromotionSection = () => {
  return (
    <div className="promotion__section__container">
      <section className="promotion__section">
        <div className="promotion__section__banner">
          <PromotionSectionCarousel />
          <div className="promotion__section__banner__other">
            <div style={{ backgroundImage: `url(${data[0].image})` }}></div>
            <div style={{ backgroundImage: `url(${data[1].image})` }}></div>
          </div>
        </div>
        <div className="promotion__section__logo">
          {logo.map((item: any, index: any) => {
            return (
              <div className="promotion__section__logo__item" key={index}>
                <div
                  className="promotion__section__logo__item__logo"
                  style={{ backgroundImage: `url(${logo[index].image})` }}
                ></div>
                <div className="promotion__section__logo__item__caption">
                  {item.caption}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

export { PromotionSection }
