
export const  getProductInfo = (orders)=>{
  let productMap = {};
  for(var i=0;i<orders.length;i++){
    for(var j=0;j<orders[i].items.length;j++){
      var pid = orders[i].items[j].productId;
      if(pid!==undefined){
        if(!productMap[pid]){
          productMap[pid]={prdouctName:'',merchantName:'',price:0,cost:0,amount:0,totalIncome:0,totalCost:0};
        }
        productMap[pid].prdouctName = orders[i].items[j].productId;
        productMap[pid].merchantName = orders[i].merchantName;
        productMap[pid].price = orders[i].items[j].price;
        productMap[pid].cost = orders[i].items[j].cost;
        productMap[pid].quantity += orders[i].items[j].quantity;
        productMap[pid].totalPrice += orders[i].price;
        productMap[pid].totalCost += orders[i].price;
      }
    }
  }
  var productArray = [];
  for (pid in productMap) {
    productArray.push({
      productId: pid,
      productName:productMap[pid].prdouctName,
      merchantName:productMap[pid].merchantName,
      price:productMap[pid].price,
      cost:productMap[pid].cost,
      quantity:productMap[pid].quantity,
      totalPrice:parseFloat(productMap[pid].totalIncome.toFixed(2)),
      totalCost:parseFloat(productMap[pid].totalCost.toFixed(2))
     });
    }
  
return productArray;  
}