import React from 'react';
import { connect } from 'react-redux';
import { selectProduct } from '../store/actions';

function OrderProductListItem({ product, selectedProduct, selectProduct }) { 

  return (
    <div onClick={ () => selectProduct(product) } 
    className={selectedProduct === product ? "order-row-selected" : "order-row"} 
    >
        
      <div className="col mobileHide">{product.productName}</div>
      <div className="col">{product.details.merchantName}</div>
    </div >
  )
}
const mapStateToProps = (state) => ({ selectedProduct: state.product });
export default connect(
  mapStateToProps,
  { selectProduct }
)(OrderProductListItem);