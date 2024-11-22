import React from "react"
import './PurchaseHistory.css'
const PurchaseHistory =()=> {

  return (
    <div className="cashHistoryContainer">

        <h3> Cash History </h3>
        
            <table id="customers">
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>No.s</th>
                <th>Date</th>
                <th>Status</th>
            </tr>
            <tr>
                <td>Lenovo Legion 3000</td>
                <td>Rs.50000</td>
                <td>2</td>
                <td>02/12/2023</td>
                <td>Delivered</td>
            </tr>
            <tr>
                <td>Asus Tuf 400</td>
                <td>Rs.60000</td>
                <td>1</td>
                <td>10/01/2023</td>
                <td>Delivered</td>
            </tr>
            <tr>
                <td>Acer Predator</td>
                <td>Rs.70000</td>
                <td>2</td>
                <td>12/12/2023</td>
                <td>Delivered</td>
            </tr>
            <tr>
                <td>Hp Pavilion Gaming</td>
                <td>Rs.80000</td>
                <td>5</td>
                <td>12/12/2023</td>
                <td>Cancelled</td>
            </tr>
            <tr>
                <td>MSI Asrock 2000</td>
                <td>Rs.60000</td>
                <td>2</td>
                <td>06/12/2023</td>
                <td>Refunded</td>
            </tr>
            <tr>
                <td>Alienware 2</td>
                <td>Rs.60000</td>
                <td>7</td>
                <td>02/06/2023</td>
                <td>Delivered</td>
            </tr>
            <tr>
                <td>MSI Avenger</td>
                <td>Rs.60000</td>
                <td>2</td>
                <td>02/12/2023</td>
                <td>Cancelled</td>
            </tr>
            <tr>
                <td>Acer Aspire 5</td>
                <td>Rs.80000</td>
                <td>1</td>
                <td>08/10/2023</td>
                <td>Delivered</td>
            </tr>
            <tr>
                <td>Acer Pradator 7</td>
                <td>Rs.90000</td>
                <td>2</td>
                <td>08/11/2023</td>
                <td>Refunded</td>
            </tr>
            <tr>
                <td>Openhimmer 2000 BmB</td>
                <td>Rs.90000</td>
                <td>2</td>
                <td>15/12/2023</td>
                <td>Delivered</td>
            </tr>
            </table>
    </div>
  )
};

export default PurchaseHistory;
