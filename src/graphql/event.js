const event = `
query event($_id: String){
    event(id:$_id){
      name
      _id
      endDate
      code
      wish{
        id
        wish
        amount
        participant{
          id
          amount
          user{
            name
            contact
          }
        }
      }
    }
  }  
`;

const eventUserid=`
query eventUserId($_userId: String){
    eventUserId(userId:$_userId){
      _id
      endDate
      name
      code
      wish{
        amount
        participant{
          userId
        }
      }
      
    }
  }
`

module.exports.grahql = event;
module.exports.grahqlEventUserId = eventUserid;
module.exports.graphqlEventId = event;