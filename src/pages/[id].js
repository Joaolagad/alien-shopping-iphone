import React, { useEffect, useState, useContext } from 'react';
import client from '../../lib/SanityClient';
import { useRouter } from 'next/router';
import { CartContext } from '../Components/CartContext';
import Cart from '../Components/Cart';

const CardDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const query = `*[_type in ["cards", "aliens"] && _id == "${id}"] {
          name,
          "imageUrl": image.asset->url,
          textOverImage
        }`;

        const result = await client.fetch(query, { id });
        if (result.length > 0) {
          setCard(result[0]);
        } else {
          setError('Card not found');
        }
      } catch (error) {
        console.log('Error fetching card details:', error);
        setError('Error fetching card details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (card) {
      addToCart(card);
      console.log('Product added to cart:', card);
    }
  };

  const handleRemoveFromCart = () => {
    if (card) {
      removeFromCart(card.id);
      console.log('Product removed from cart:', card);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="product-container">
      <div className="product-image">
        <img src={card.imageUrl} alt={card.name} style={{ height: '400px' }} />
      </div>
      <div className="product-details">
        <h2>{card.name}</h2>
        <div className="text-over-image">{card.textOverImage}</div>
        <button onClick={handleAddToCart} className="btn btn-primary">Add to Cart</button>
        <button onClick={handleRemoveFromCart} className="btn btn-primary">Remove from Cart</button>
        <button onClick={() => window.history.back()} className="btn btn-secondary">Go Back</button>
      </div>
      <Cart />
    </div>
  );
};

export default CardDetailsPage;
