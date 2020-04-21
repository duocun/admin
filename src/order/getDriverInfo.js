
export const  getDriverInfo = (orders)=>{
  let driverMap = {};
  for(var i=0;i<orders.length;i++){
      var did = orders[i].driverId;
      if(did!==undefined){
          if(!driverMap[did]){
              driverMap[did]=[0,0,[],[],{}]; 
          }
          driverMap[did][0]++;
          driverMap[did][1]+= orders[i].items.length;
          driverMap[did][2].push(orders[i].cost);
          driverMap[did][3] = orders[i].driverName;
          var mid = orders[i].merchantId;
          if(!driverMap[did][4][mid]){
            driverMap[did][4][mid]=["",0];
          }
          driverMap[did][4][mid][0]=orders[i].merchantName;
          driverMap[did][4][mid][1]+=orders[i].items.length;
  
          console.log(driverMap);
          
         
  
  }
  }
  var driverArray = [];
  for (did in driverMap) {
      driverArray.push({driverId: did, details: driverMap[did],driverName:driverMap[did][3],pickList:driverMap[did][4]});
    }
  
return driverArray;  
}