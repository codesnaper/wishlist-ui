const deleteEvent = `
mutation deleteEvent($eventId:ID){
    deleteEvent(
      _id:$eventId,
    ){
      _id
    }
  }
  
`;

const parameter = (id)=>{
    let obj ={};
    obj.eventId = id;
    return obj;
}

module.exports.deleteEventGraphql = deleteEvent;
module.exports.deleteEventParam = parameter;