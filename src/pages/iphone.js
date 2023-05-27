import React, { useState, useEffect } from 'react';
import client from '../../lib/SanityClient';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BenAliens = () => {
  const [bens, setBens] = useState([]);
  const router = useRouter(); 


  
  useEffect(() => {
    const fetchAliens = async () => {
      try {
        const query = `*[_type == "aliens"] {
          _id,
          name,
          "imageUrl": image.asset->url,
          text
        }`;
        const result = await client.fetch(query);
        setBens(result);
      } catch (error) {
        console.log('error');
      }
    };

    fetchAliens();
  }, []);


  const handleImageClick = (id) => {
    router.push(`/${id}`);
  };


  
  return (
    
        <div className="grid-container">
        {bens.map((ben) => (
            <div
            key={ben._id}
            className="grid-item"
            >
          <Link href="/[id]" as={`/${ben._id}`} passHref>


          <div
             style={{
              display: 'block',
              cursor: 'pointer',
              textDecoration: 'none',
                  }}
            onClick={() => handleImageClick(ben._id)} >

            <img className='img-ben'
                src={ben.imageUrl}
                alt={ben.name}
                width="200px"
            />
          </div>
          </Link>
            </div>
        ))}
            </div>
        
  );
}

export default BenAliens;
