import React, { useEffect, useState, useRef } from 'react';
import client from '../../lib/SanityClient';

const ProductsNav = () => {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);
  const itemsPerRow = 2;
  const originalItemWidth = 400;
  const widthReductionPercentage = 0.5; // Reduce item width by 50%
  const itemWidth = originalItemWidth - (originalItemWidth * widthReductionPercentage);
  const spacing = 0; // Remove spacing completely

  useEffect(() => {
    const fetchCellphones = async () => {
      try {
        const query = `*[_type == "cellphone"]{
            name,
            "imageUrl": image.asset->url,
            
        }`;
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.log('Error fetching cellphones:', error);
      }
    };

    fetchCellphones();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= itemWidth * itemsPerRow + spacing * (itemsPerRow - 1);
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += itemWidth * itemsPerRow + spacing * (itemsPerRow - 1);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <button onClick={scrollLeft}>&lt;</button>
        <div
          style={{
            display: 'flex',
            maxWidth: '100%',
            width: `${itemWidth * itemsPerRow}px`,
            overflowX: 'scroll',
            overflow: 'hidden',
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
           
          }}
          ref={scrollContainerRef}
        >
          {products.map((product, index) => (
            <div
              key={index}
              style={{
                minWidth: `${itemWidth}px`,
                marginRight: `-${spacing}px`,
                scrollSnapAlign: 'start',
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ height: '200px' }}
              />
              <div>{product.textOverImage}</div>
            </div>
          ))}
        </div>
        <button onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
};

export default ProductsNav;
