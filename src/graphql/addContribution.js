const contribute = `
mutation createParticipant($userId: String, $amount: Int , $wishId:String ){
    createParticipant(
        userId:$userId,
        amount:$amount,
        wishId:$wishId,
    ){
        id
  }
}
  
`;

const parameter = (userId, amount, wishId)=>{
    let obj ={};
    obj.userId = userId;
    obj.amount = parseInt(amount);
    obj.wishId = wishId;
    return obj;
}

module.exports.addContributionGraphql = contribute;
module.exports.contributionParameter = parameter;