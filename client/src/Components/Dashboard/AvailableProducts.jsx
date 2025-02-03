import React, { useEffect, useState } from "react";
// import { FaCartPlus, FaStar } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Features/Product/productSlice";


export default function AvailableProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const productStatus = useSelector((state) => state.products.status);
  const productError = useSelector((state) => state.products.error);

  // useEffect(() => {
  //   dispatch(
  //     fetchProducts({
  // })
  //   );
  // }, [dispatch]);
  
  useEffect(() => {
    dispatch(fetchProducts("Available Products"));
  }, [dispatch]);


  return (
    <>
      <section>
        <div className="shopDetailsProducts">
          <div className="shopDetailsProductsContainer">
            {productStatus === "loading" && <p>Loading...</p>}
            {productStatus === "failed" && <p>{productError}</p>}
            {productStatus === "succeeded" &&
              // check if products is an array and has length
              Array.isArray(products) &&
              products.length > 0 &&
              products.map((product, index) => (
                // <div className="sdProductContainer" key={index}>
                <div key={index} className="border border-slate-500">
                  <div className="sdProductImages">
                    <div>
                      <img
                        src={product.image[0]}
                        alt=""
                        // className="sdProduct_front"
                        className=""
                      />
                      {/* <img
                        src={product.image[1]}
                        alt=""
                        className=""
                        // className="sdProduct_back"
                      /> */}
                    </div>
                  </div>
                  {/* <div className="sdProductInfo"> */}
                  <div className="p-1">
                    <div className="sdProductCategoryWishlist">
                      {/* <p>{product.category.name}</p> */}
                    </div>

                    {/* <div className="sdProductNameInfo"> */}
                    <div className="">
                      <h5>{product.title}</h5>
                      <p className="mt-4">
                        ₦
                        {product.prices.price
                          ? product.prices.price
                          : product.prices.originalPrice}
                      </p>

                      <div className="mt-3">
                        <button className="w-full px-4 py-2 bg-[#25D366] text-black font-medium rounded hover:bg-black hover:text-white transition">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
