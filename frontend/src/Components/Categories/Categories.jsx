import { useDispatch, useSelector } from "react-redux";
import categories from "../Assets/categories";
import "./Categories.css";
import { useEffect } from "react";
import { fetchCategories } from "../../features/categorySlice";
import { setSelectedCategory } from "../../features/productSlice";
import { fetchProducts } from "../../features/productSlice";
// import * as IoIcons from 'react-icons/io';
// import * as Io5Icons from 'react-icons/io5';
// import * as PiIcons from 'react-icons/pi';
// import * as TbIcons from 'react-icons/tb';

// const allIcons = {
//     ...IoIcons,
//     ...Io5Icons,
//     ...PiIcons,
//     ...TbIcons,
//     // add other icon libraries as needed
//   };

let Categories = () => {
  // const getIcon = (icon) => {
  //     return  allIcons[icon];
  // }

  const dispatch = useDispatch();
  const companyName = useSelector((state) => state.company.companyName);
  const { data, error, status } = useSelector((state) => state.categories);

  useEffect(() => {
    if (companyName) {
      dispatch(fetchCategories(companyName));
    }
  }, [dispatch, companyName]);

  useEffect(() => {
    if (data.length > 0) {
      dispatch(setSelectedCategory(data[0].id));
    }
  }, [dispatch, data]);

  const handleCategoryClick = (categoryId, categoryName) => {
    dispatch(
      dispatch(setSelectedCategory({ id: categoryId, name: categoryName }))
    );
    dispatch(fetchProducts({ companyName, categoryId }));
  };

  return (
    <div className="categoriesContainerMain">
      <ul className="categoriesContainer">
        {data?.map((cat, i) => {
          // const IconComponent = getIcon(cats.icon);
          return (
            <li
              key={i}
              className="CategoryListItems"
              onClick={() => handleCategoryClick(cat.id, cat.name)}
            >
              {/* <div className='categoryLogo'> */}
              {/* {<IconComponent/>} */}
              {/* </div> */}
              <div>
                <p> {cat.name} </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
