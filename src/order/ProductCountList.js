import React from 'react';
import {connect} from 'react-redux';
import {ProductCountListItem} from './ProductCountListItem';
import './ProductCountList.scss';

function ProductCountList({ productCountList }) {
  console.log(productCountList);
  return (
    
    productCountList.map(pc =>
      <ProductCountListItem item={pc}  key={pc.productId} />
    )
  )
}

const mapStateToProps = (state) => ({ productCountList: state.productCountList });

export default connect(
  mapStateToProps,
)(ProductCountList);