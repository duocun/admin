import React from 'react';
import { connect } from 'react-redux';
import { selectProduct } from '../store/actions';
import './ProductCountListItem.scss';
export function ProductCountListItem({ item }) { 
  return (
    <div className="product-count">
      <div className="col-name">{item.productName}</div>
      <div className="col-quantity">{item.quantity}</div>
    </div>
  )
}