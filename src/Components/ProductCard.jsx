import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import classes from './ProductCard.module.css';
import { addItemHandler, deleteItemHandler } from '../slices/CartItemCounterSlice';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const ProductCard = (props) => {
  const dispatch = useDispatch();
  const itemcount = useSelector((state) => state.ItemCounter[props.id] || 0);

  const renderTooltip = (description) => (
    <Tooltip id="tooltip-right">
      {description}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="auto"
      overlay={renderTooltip(props.description)}
    >
      <Card style={{ width: '12rem', margin: '.5rem',borderRadius:'0px' }} className={classes.cardcontainer}>
        <Card.Img className={classes.image} variant="top" src={props.url} />
        <Card.Body style={{ padding: '1rem', background: '#f8f8f8', display: 'flex', flexDirection: 'column', justifyContent: 'end' }}>
          <Card.Title style={{ fontSize: 'smaller' }}>{props.title}</Card.Title>
          <h4 style={{ color: "green", fontSize: 'medium' }}>Rs. {props.price}</h4>
          <div style={{ display: 'flex',justifyContent:'center', alignItems: 'center' }}>
            <Button variant="secondary" size='sm' style={{borderRadius:'2rem', width:'4rem',padding:'.5rem'}} onClick={() => dispatch(deleteItemHandler(props.id))} disabled={itemcount <= 0}> <ShoppingCartIcon/>-</Button>
            <span style={{ margin: '0 10px' }}>{itemcount}</span>
            <Button variant="secondary" style={{borderRadius:'2rem'}} onClick={() => dispatch(addItemHandler(props.id))}><ShoppingCartIcon/>+</Button>
          </div>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
};

export default ProductCard;
