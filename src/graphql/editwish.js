const updateWish = `
mutation updateWish($id: ID,$wish: String, $amount: Int , $eventId:String ){
    updateWish(
        _id:$id,
        wish:$wish,
        amount:$amount,
        eventId:$eventId,
    ){
        id
        wish
        amount
  }
}
  
`;

const parameter = (id,wish, amount, eventId)=>{
    let obj ={};
    obj.id = id;
    obj.wish = wish;
    obj.amount = parseInt(amount);
    obj.eventId = eventId;
    return obj;
}

module.exports.updateWishGrpahql = updateWish;
module.exports.updateWishParam = parameter;