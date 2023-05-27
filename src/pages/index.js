import React from "react";
import Navigation from "./Navigation";
import HeaderNav from "./HeaderNav";
import ProductsNav from "./ProductsNav";
import HeaderSecondary from "./HeaderSecondary";
import ProductsHeader from "./ProductsHeader";
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter(); 

  const handleImageClick = (id) => {
    router.push(`/${id}`);
  };
  return (
    <div>
      <Navigation />
      <HeaderNav />
      <ProductsNav />
      <HeaderSecondary />
      <ProductsHeader onImageClick={handleImageClick} /> 
    </div>
  );
};

export default HomePage;
