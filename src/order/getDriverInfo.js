export const getDriverInfo = (orders) => {
  let driverMap = {};
<<<<<<< HEAD
  for (var i = 0; i < orders.length; i++) {
    var did = orders[i].driverId;
    if (did !== undefined) {
      if (!driverMap[did]) {
        driverMap[did] = {
          driverId: '',
          totalOrderQuantity: 0,
          totalProductQuantity: 0,
          totalCost: 0,
          driverName: 0,
          pickUpList: {}
        };
      }
      driverMap[did].driverId = did;
      driverMap[did].totalOrderQuantity++;
      driverMap[did].totalProductQuantity += orders[i].items.length;
      driverMap[did].totalCost += orders[i].cost;
      driverMap[did].driverName = orders[i].driverName;
      var mid = orders[i].merchantId;
      if (!driverMap[did].pickUpList[mid]) {
        driverMap[did].pickUpList[mid] = {
          merchantId: '',
          merchantName: '',
          merchantProductQuantity: 0
        };
      }
      driverMap[did].pickUpList[mid].merchantId = mid;
      driverMap[did].pickUpList[mid].merchantName = orders[i].merchantName;
      driverMap[did].pickUpList[mid].merchantProductQuantity += orders[i].items.length;




    }
=======
  for(var i=0;i<orders.length;i++){
      const driver = orders[i].driver;
      var did = driver ? driver._id : 'N/A';
      if(did!==undefined){
          if(!driverMap[did]){
              driverMap[did]=[0,0,[],[],{}]; 
          }
          driverMap[did][0]++;
          driverMap[did][1]+= orders[i].items.length;
          driverMap[did][2].push(orders[i].cost);
          driverMap[did][3] = driver ? driver.userame : 'N/A';
          var mid = orders[i].merchantId;
          if(!driverMap[did][4][mid]){
            driverMap[did][4][mid]=["",0];
          }
          driverMap[did][4][mid][0]=orders[i].merchant.name;
          driverMap[did][4][mid][1]+=orders[i].items.length;
  
          console.log(driverMap);
  }
>>>>>>> optimize-order-api
  }
  var driverArray = [];
  for (did in driverMap) {
    driverArray.push({
      driverId: driverMap[did].driverId,
      totalOrderQuantity: driverMap[did].totalOrderQuantity,
      totalProductQuantity: driverMap[did].totalProductQuantity,
      totalCost: parseFloat(driverMap[did].totalCost.toFixed(2)),
      driverName: driverMap[did].driverName,
      pickUpList: driverMap[did].pickUpList
    });
  }
  

  return driverArray;
}