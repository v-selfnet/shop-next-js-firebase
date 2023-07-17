'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { mainSwiper } from '@/data/mainSwiper';
import SingleHeroSwiper from './SingleHeroSwiper';

const HeroSwiper = () => {
    return (
        <div className='main-slider'>
            <Swiper slidesPerView={1}
                loop navigation effect="fade" autoplay
                modules={[Navigation, EffectFade, Autoplay]}
            >
                {
                    mainSwiper.map(slider => <SwiperSlide
                        key={slider.id}>
                        <SingleHeroSwiper slider={slider} />
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default HeroSwiper;