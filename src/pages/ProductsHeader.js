import React, { useState, useEffect, useRef } from 'react';
import client from '../../lib/SanityClient';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProductsHeader = () => {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);
  const scrollAmount = 400;
  const router = useRouter(); 

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const query = `*[_type == "cards"] {
          _id,
          name,
          "imageUrl": image.asset->url,
          text
        }`;
        const result = await client.fetch(query);
        setProducts(result);
      } catch (error) {
        console.log('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleImageClick = (id) => {
    router.push(`/${id}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button onClick={scrollLeft}>&lt;</button>
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            overflow: 'hidden',
          }}
          ref={scrollContainerRef}
        >
          {products.map((product) => (
            <div
              key={product._id}
              style={{
                minWidth: '400px',
                marginRight: '10%',
              }}
            >
            <Link href="/[id]" as={`/${product._id}`} passHref>

                <div
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                  onClick={() => handleImageClick(product._id)} 
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      height: '300px',
                      borderRadius: '10px',
                      transition: 'transform 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'scale(0.5)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button onClick={scrollRight}>&gt;</button>
      </div>
    </div>
  );
};

export default ProductsHeader;
