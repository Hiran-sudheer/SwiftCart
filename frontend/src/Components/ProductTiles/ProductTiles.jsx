import React, { useState, useEffect } from "react";
import "./ProductTiles.css";
// import data from "../Assets/data";
import { Link } from "react-router-dom";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import HomeAddandSub from "../HomeAddandSub/HomeAddandSub";
import Footer from "../Footer/Footer"; // Import the Footer component
import { IoFilterOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/productSlice";
import { addToCart } from "../../features/cartSlice";

const ProductTile = () => {
  const companyName = useSelector((state) => state.company.companyName);
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.products);
  const selectedCategoryId = useSelector(
    (state) => state.products.selectedCategoryId
  );
  const selectedCategoryName = useSelector(
    (state) => state.products.selectedCategoryName
  );
  const user = useSelector((state) => state.auth.user);
  const username = user?.payload?.user.username || user?.user?.username;

  const searchQuery = useSelector((state) => state.search.searchQuery);
  
// console.log(username)
  useEffect(() => {
    if (companyName) {
      dispatch(fetchProducts({ companyName, categoryId: selectedCategoryId }));
    }
  }, [dispatch, companyName, selectedCategoryId]);

  const [sortBy, setSortBy] = useState("default");

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    const sortedData = [...data];

    if (criteria === "priceAsc") {
      sortedData.sort((a, b) => a.OfferPrice - b.OfferPrice);
    } else if (criteria === "priceDesc") {
      sortedData.sort((a, b) => b.OfferPrice - a.OfferPrice);
    }

    dispatch({ type: "UPDATE_PRODUCTS", payload: sortedData });
  };

  const [buttonTexts, setButtonTexts] = useState([]);
  const [cartIcons, setCartIcons] = useState([]);
  const [counts, setCounts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    if (data) {
      setButtonTexts(Array(data.length).fill("Add to Bag"));
      setCartIcons(Array(data.length).fill(true));
      setCounts(Array(data.length).fill(0));
    }
  }, [data]);

  const handleButtonClick = (productId, index, price) => {
    const newButtonTexts = [...buttonTexts];
    const newCartIcons = [...cartIcons];
    const newCounts = [...counts];

    
    if (cartItems[productId] === undefined || cartItems[productId] === 0) {
      // console.log(username)
      const jsonData = JSON.stringify({
        "username": username,
        "product_id": productId,
        "quantity": 1,
      });
      
      dispatch(addToCart(JSON.parse(jsonData)));
      // setCartCount(1);
      newButtonTexts[index] = (
        <HomeAddandSub
          
          productId={productId}
          onCountZero={() => handleCountZero(index)}
          onCountChange={(count) => handleCountChange(count, price)}
        />
      );
      newCartIcons[index] = false;
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [productId]: 1,
      }));
      
    } else {
      // If count is not 0, just toggle UI to HomeAddandSub
      newButtonTexts[index] = (
        <HomeAddandSub
          productId={productId}
          onCountZero={() => handleCountZero(index)}
          onCountChange={(count) => handleCountChange(count, price)}
        />
      );
      newCartIcons[index] = false;
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [productId]: cartItems[productId] + 1,
      }));
    }
    
    setButtonTexts(newButtonTexts);
    setCartIcons(newCartIcons);
    setCounts(newCounts);
  };

  const handleCountZero = (index) => {
    const newButtonTexts = [...buttonTexts];
    const newCartIcons = [...cartIcons];
    const newCounts = [...counts];

    newButtonTexts[index] = "Add to Cart";
    newCartIcons[index] = true;
    newCounts[index] = 0;

    setButtonTexts(newButtonTexts);
    setCartIcons(newCartIcons);
    setCounts(newCounts);
  };

  const handleCountChange = (count, price) => {
    const newTotalPrice = totalPrice + count * price;
    setTotalPrice(newTotalPrice);
  };

  const filteredData = searchQuery
  ? data.filter((product) =>
      product.Productname.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : data;

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // if (status === 'failed') {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div className="productTileGridContainer">
      <div className="productTileHead">
        <h3>{selectedCategoryName}</h3>
        <div>
          <div className="dropdown">
            <button className="dropbtn">
              <IoFilterOutline />
              Sort{" "}
            </button>
            <div className="dropdown-content">
              <a onClick={() => handleSortChange("default")}>Default</a>
              <a onClick={() => handleSortChange("priceAsc")}>
                Price: Low to High
              </a>
              <a onClick={() => handleSortChange("priceDesc")}>
                Price: High to Low
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="cards">
          {filteredData?.map((product, i) => (
            <div className="card" key={i}>
              <Link
                to={`/${companyName}/product/${product.id}`}
                style={{ textDecoration: "none" }}
              >
                <div>
                  <img src={product?.Image} alt="" />
                </div>
              </Link>
              <div>
                <h3>{product?.Productname}</h3>
              </div>
              <div>
                <h4>Rs. {product?.OfferPrice}</h4>
                <p>
                  <s>Rs. {product?.RegularPrice}</s>
                </p>
              </div>
              {counts[i] === 0 ? (
                <AddToCartButton
                  buttonText={buttonTexts[i]}
                  cartIcon={cartIcons[i]}
                  onClick={() => handleButtonClick(product.id, i, product.OfferPrice)}
                />
              ) : (
                buttonTexts[i]
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer totalPrice={totalPrice} />
    </div>
  );
};

export default ProductTile;
