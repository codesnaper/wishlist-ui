const deleteEvent = `
mutation deleteEvent($eventId:ID!){
    deleteEvent(
      id:$eventId,
    ){
      id
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