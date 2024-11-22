import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import carouselAdds from "../Assets/carouselAdds";
import "./Carousel.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../features/bannerSlice";

let Carousel = () => {
  const options = {
    item: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    dots: true,
    nav: false,

    responsive: {
      1100: {
        items: 2,
      },
      724: {
        items: 2,
      },
      500: {
        items: 1,
      },
      300: {
        items: 1,
      },
    },
  };

  const dispatch = useDispatch();
  const companyName = useSelector((state) => state.company.companyName);
  const { data, error, status } = useSelector((state) => state.banners);

  useEffect(() => {
    if (companyName) {
      dispatch(fetchBanners(companyName));
    }
  }, [dispatch, companyName]);

  return (
    <div className="carouselContainer">
      <h5>Top Offers Right Now</h5>
      {data.length > 0 && (
        <OwlCarousel className="owl-theme owlContainer" {...options}>
          {data.map((item, i) => {
            const imageUrl = Object.values(item)[0];
            return (
              <div key={i} className="item">
                {/* <Link to={`${companyName}/Offers/`}> */}
                <img src={imageUrl} alt="" />
                {/* </Link> */}
              </div>
            );
          })}
        </OwlCarousel>
      )}
    </div>
  );
};

export default Carousel;
