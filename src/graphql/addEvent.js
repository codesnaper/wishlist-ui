const addEvent = `
mutation createNewEvent($name: String, $endDate: DateTime , $userId:String , $code:Int){
    createEvent(
      name:$name,
      endDate:$endDate,
      organiserid:$userId,
      code:$code,
    ){
      name,
      endDate,
      code,
      wish{
        amount
        participant{
          userId
        }
      }
    }
  }
  
`;

const parameter = (name,endDate,userId,code)=>{
    let obj ={};
    obj.name = name;
    obj.endDate = endDate;
    obj.userId = userId;
    obj.code = code;
    return obj;
}

module.exports.addEventGraphQL = addEvent;
module.exports.addEventParam = parameter;