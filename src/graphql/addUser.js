const addUser = `
mutation createUser($name: String, $contact: String, $email: String){
    createUser(
      name:$name
      contact:$contact
      email:$email
    ){
      id
      name
      contact
      email
      isExternal
    }
  }
  
`;

const parameter = (name, contact, email)=>{
    let obj ={};
    obj.name = name;
    obj.contact = contact;
    obj.email = email;
    return obj;
}

module.exports.addUser = addUser;
module.exports.parameter = parameter;