import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard";

import "swiper/css";

export default function TrendingSlider({
  products,
  wishlist,
  toggleWishlist,
  addToCart,
  addRecentlyViewed,
  setSelectedProduct,
}) {
  return (
    <section className="bg-white px-6 py-20 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-black uppercase tracking-[0.4em] text-yellow-600">
            Hot Right Now
          </p>

          <h2 className="mt-3 text-5xl font-black uppercase">
            Trending Now
          </h2>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={1.2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {products.slice(0, 8).map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                product={product}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                addRecentlyViewed={addRecentlyViewed}
                setSelectedProduct={setSelectedProduct}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}