import { PromotionSectionCarousel } from './PromotionSectionCarousel'
import '../public/styles/PromotionSection.scss'
const { data } = require('./bannerOther')

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
          <div className="promotion__logo__item">Logo1</div>
          <div className="promotion__logo__item">Logo2</div>
          <div className="promotion__logo__item">Logo3</div>
          <div className="promotion__logo__item">Logo4</div>
          <div className="promotion__logo__item">Logo5</div>
          <div className="promotion__logo__item">Logo6</div>
          <div className="promotion__logo__item">Logo7</div>
          <div className="promotion__logo__item">Logo8</div>
        </div>
      </section>
    </div>
  )
}

export { PromotionSection }
