const addWish = `
mutation createWish($wish: String, $amount: Int , $eventId:String ){
    createWish(
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

const parameter = (wish, amount, eventId)=>{
    let obj ={};
    obj.wish = wish;
    obj.amount = parseInt(amount);
    obj.eventId = eventId;
    return obj;
}

module.exports.addWishGrpahql = addWish;
module.exports.addWishParam = parameter;