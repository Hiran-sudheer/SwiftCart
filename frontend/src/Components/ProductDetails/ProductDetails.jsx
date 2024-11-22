import "../ProductDetails/ProductDetails.css";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineBolt, MdOutlineShoppingCart } from "react-icons/md";
// import data from "../Assets/data";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";

const ProductDetail = () => {
  
  const companyName = useSelector((state) => state.company.companyName);
  const dispatch = useDispatch();
  const { id } = useParams();
  const selectedProduct = useSelector(
    (state) => state.products.selectedProduct
  );
  const user = useSelector((state) => state.auth.user);
  const username = user?.payload?.user.username || user?.user?.username;

  const cartAlert = () => {
    const jsonData = JSON.stringify({
      "username": username,
      "product_id": id,
      "quantity": 1,
    });
    
    dispatch(addToCart(JSON.parse(jsonData)));
    alert("Product Added to Cart");
  };

  useEffect(() => {
    if (companyName) {
      dispatch(fetchProductById({ companyName, productId: id }));
    }
  }, [dispatch, id, companyName]);

  // const product = data.find((item) => item.id === parseInt(id));

  if (!selectedProduct || selectedProduct.length === 0) {
    return <div>Product not found</div>;
  }

  // console.log(selectedProduct);
  return (
    <div className="productDetailsContainer">
      <div className="productImageAndDetailsContainer">
        <div className="productImageandButton">
          <div className="Image">
            <img
              className="productImage"
              src={selectedProduct[0].Image}
              alt=""
            />
          </div>
          <div className="buttonsContainer">
            <Link
              style={{ textDecoration: "none" }}
              className="productOrderNow"
              to={`/cart/`}
            >
              <button>
                <MdOutlineBolt />
                Order Now
              </button>
            </Link>

            <button onClick={cartAlert} className="productAddToCart">
              <MdOutlineShoppingCart />
              Add to Cart
            </button>
          </div>
        </div>
        <div className="productDetails">
          <i>
            <p>{selectedProduct[0].Category.name}</p>
          </i>

          <p className="productName">{selectedProduct[0].Productname}</p>
          <p className="productDesc">{selectedProduct[0].Description}</p>
          <div className="productPriceContainer">
            <p className="productPrice">Rs.{selectedProduct[0].OfferPrice}/-</p>
            <p className="productPrice">
              <s>Rs.{selectedProduct[0].RegularPrice}/-</s>
            </p>
          </div>

          <div>{/* <p>Color : </p> */}</div>

          <div className="deliveryDetails">
            <p>Delivery :</p>
            <div className="inputContainer">
              <IoLocationSharp className="locationIcon" />
              <input
                type="text"
                name=""
                id=""
                placeholder="enter delivery pincode"
              />
            </div>
          </div>

          <div className="specificationsContainer">
            <div className="specificationsHead">
              <h3> Specifications</h3>
            </div>
            <div className="specificationsBody">
              {selectedProduct[0].specifications.map((spec, index) => (
                <div key={index} className="specificationItem">
                  <p>{spec.name}:</p>
                  <b>
                    <p>{spec.value}</p>
                  </b>
                </div>
              ))}
            </div>

            <div className="specificationsWarrenty">
              <h4>Warrenty</h4>
              <p>
                Company covered warrenty of {selectedProduct[0].warranty} is available for this product
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
