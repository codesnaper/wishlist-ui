const editEvent = `
mutation editEvent($eventId:ID, $name: String, $endDate: DateTime , $userId:String , $code:Int){
    updateEvent(
      _id:$eventId,
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

const parameter = (id,name,endDate,userId,code)=>{
    let obj ={};
    obj.eventId = id;
    obj.name = name;
    obj.endDate = endDate;
    obj.userId = userId;
    obj.code = code;
    return obj;
}

module.exports.editEventGrahql = editEvent;
module.exports.editEventParam = parameter;