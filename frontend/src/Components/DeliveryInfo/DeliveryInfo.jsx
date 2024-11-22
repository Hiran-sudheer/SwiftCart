import { React, useEffect } from "react";
import CartBill from "../CartBill/CartBill";
import "./DeliveryInfo.css";
import { MdMyLocation } from "react-icons/md";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses, postAddress, setSelectedAddressId } from "../../features/addressSlice";

const DeliveryInfo = ({flag}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.payload?.user.id || user?.user?.id;
  const successMessage = useSelector((state) => state?.address?.successMessage);
  const addresses = useSelector((state) => state?.address?.addresses);
  // console.log(addresses);
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressFormData, setAddressFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip_code: "",
  });

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData({
      ...addressFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(postAddress(addressFormData)); 
    dispatch(fetchAddresses());
    setAddressFormData({
      name: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
    });
    
  };

  const handleAddressSelect = (id) => {
    setSelectedAddress(id);
    dispatch(setSelectedAddressId(id)); // Update selected address state
  };
  // const [addresses, setAddresses] = useState([
  //     {
  //       id: 1,
  //       address: {
  //         line1: "Pukkattupady - Perumbavoor Rd",
  //         line2: "Thadiyittaparambu",
  //         city: "Kerala",
  //         pincode: "626605",
  //         phone: "0484 268 2260",
  //       },
  //     },
  //     {
  //         id: 2,
  //         address: {
  //           line1: "Parshinijadavu - Ernakulam Rd",
  //           line2: "Thadiyittaparambu",
  //           city: "Kerala",
  //           pincode: "626605",
  //           phone: "0998 268 2260",
  //         },
  //       },
  //       {
  //         id: 3,
  //         address: {
  //           line1: "Pukkattupady - Perumbavoor Rd",
  //           line2: "Thadiyittaparambu",
  //           city: "Kerala",
  //           pincode: "626605",
  //           phone: "0484 268 2260",
  //         },
  //       },

  //   ]);

  // const removeAddress = (id) => {
  //   const updatedAddresses = addresses.filter((addr) => addr.id !== id);
  //   setAddresses(updatedAddresses);
  // };

  return (
    <div>
      {/* <h3>DELIVER TO YOUR DOORSTEP </h3> */}
      <h5>DELIVERY INFORMATION </h5>
      {successMessage && <p>{successMessage}</p>}
      <div className="deliveryInfoContainer">
        <div className="deliveryInputsContainer">
          <form onSubmit={handleSubmit}>
            <div className="delveryNameContainer">
              <div className="deliveryName">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={addressFormData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="deliveryPhone">
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={addressFormData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="delveryAddressContainer">
              <label htmlFor="street">Address</label>
              <textarea
                id="street"
                name="street"
                value={addressFormData.street}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="delveryLandmarkContainer">
              <div className="deliveryLadmarkName">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={addressFormData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="deliveryStreetName">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={addressFormData.state}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {/* <div className="deliveryLadmarkName">
                    <label htmlFor="">Landmark</label>
                    <input type="text" />
                </div>
                <div className="deliveryStreetName">
                    <label htmlFor="">Streetname</label>
                    <input type="text" />
                </div> */}
            </div>

            <div className="delverypincodeAndLocationContainer">
              <div className="deliveryPincode">
                <label htmlFor="zip_code">Zip Code</label>
                <input
                  type="text"
                  id="zip_code"
                  name="zip_code"
                  value={addressFormData.zip_code}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="deliveryGPS">
                <button className="gpsLocationForDelivery">
                  <MdMyLocation className="locationIcon" />
                  Get Current Location
                </button>
              </div>
            </div>

            <button className="addAnAddressBtn" type="submit" value="Submit">Add this Address </button>
          </form>
        </div>
       {flag ===1? null : (
        <div className="alreadySavedAddressesContainer">
          <h4>Choose from Old Addresses</h4>

          <div className="radioAndSelectedAdderss">
            <form>
              {addresses.map((addr) => (
                <div className="radio" key={addr.id}>
                  <label>
                  <input
                    type="radio"
                    value={addr.id}
                    checked={selectedAddress === addr.id} // Check if the address is selected
                    onChange={() => handleAddressSelect(addr.id)}
                    required
                  />
                    <div>
                      <p>{addr.name}</p>
                      <p>{addr.stret}</p>
                      <p>
                        {addr.city},{addr.state}, {addr.zip_code}
                      </p>
                      <p>{addr.phone}</p>
                    </div>
                  </label>
                </div>
              ))}
            </form>
          </div>
        </div>
        )}
      </div>
      {flag === 1?null:(
      <div>
        <CartBill />
      </div>
)}
      {/* <div className="continurToPayButton">
        <button >Continue to Pay</button>
      </div> */}
    </div>
  );
};

export default DeliveryInfo;
