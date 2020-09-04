const editEvent = `
mutation editUser($id:ID!, $name: String, $contact: String , $email:String ){
    editUser(
      id:$id,
      name:$name,
      contact:$contact,
      email:$email
    ){
      id
      name
      contact
      email
    }
  }
  
`;

const parameter = (id,name,contact,email)=>{
    let obj ={};
    obj.id = id;
    obj.name = name;
    obj.contact = contact;
    obj.email = email;
    return obj;
}

module.exports.editUserGrahql = editEvent;
module.exports.editUserParam = parameter;