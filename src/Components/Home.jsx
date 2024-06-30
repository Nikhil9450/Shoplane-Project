import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import classes from './Home.module.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        console.log("response-------->", response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);
  const categories = Array.from(new Set(data.map(item => item.category)));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
<div className={classes.home}>
      <Container className={classes.container}>
        {categories.map(category => (
          <div key={category} className={classes.categorySection}>
            <h6 style={{marginTop:'1rem'}}>{category.toUpperCase()}</h6>
            <Row>
              {data.filter(item => item.category === category).map(item => (
                <Col key={item.id} md={3}>
                  <ProductCard 
                    id={item.id} 
                    url={item.image} 
                    title={item.title} 
                    price={item.price} 
                    description={item.description} 
                  />
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
