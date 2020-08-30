const deleteWish = `
mutation deleteWish($id: ID){
    deleteWish(
        _id:$id,
    ){
        id
        wish
  }
}
  
`;

const parameter = (id)=>{
    let obj ={};
    obj.id = id;
    return obj;
}

module.exports.deleteWishGrpahql = deleteWish;
module.exports.deleteWishParam = parameter;