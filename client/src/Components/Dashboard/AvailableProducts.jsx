import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Features/Product/productSlice";
import { Link } from "react-router-dom";


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
        <div className="">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {productStatus === "loading" && <p>Loading...</p>}
            {productStatus === "failed" && <p>{productError}</p>}
            {productStatus === "succeeded" &&
              // check if products is an array and has length
              Array.isArray(products) &&
              products.length > 0 &&
              products.map((product, index) => (
                // <div className="sdProductContainer" key={index}>
                <div key={index} className="border border-slate-500 bg-white shadow-lg rounded-lg">
                  <div className="">
                    <div className="flex items-center">
                      <img
                        src={product.image[0]}
                        alt=""
                        className="w-full object-contain h-40"
                      />
                    </div>
                  </div>
                  <div className="p-1 border-t-2">
                    <div className="sdProductCategoryWishlist">
                      {/* <p>{product.category.name}</p> */}
                    </div>
                    <div className="">
                      <h5>{product.title}</h5>
                      <p className="mt-4">
                        ₦
                        {product.prices.price
                          ? product.prices.price
                          : product.prices.originalPrice}
                      </p>

                      <div className="mt-3">
                        <a href={`https://wa.me/2348100105085?text=I'm%20interested%20in%20buying%20${product.title}`} target="_blank"
                        >
                        <button
                        className="flex items-center justify-center gap-x-2 w-full px-4 py-2 bg-[#25D366] text-black font-medium rounded hover:bg-black hover:text-white transition">
                          Buy Now
                          <FaWhatsapp size={20} />
                        </button>
                        </a>
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
