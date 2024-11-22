import Carousel from "../Components/Carousel/Carousel"
import Categories from "../Components/Categories/Categories"
import ProductTile from "../Components/ProductTiles/ProductTiles"
// import Categories from "../Components/Categories/Categories"
import { useSelector } from 'react-redux';




let Index = ()=>{
    const companyName = useSelector((state) => state.company.companyName);
    return(
        <div>
             
            <Carousel/>
            <h2>Welcome to {companyName}'s Dashboard</h2>
            <Categories/>
            <ProductTile/>
        </div>
    )
}

export default Index