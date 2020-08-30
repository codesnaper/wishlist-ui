const addUser = `
mutation createUser($name: String, $contact: String, $email: String, $isExternal: Boolean, $password: String){
    createUser(
      name:$name
      contact:$contact
      email:$email
      password:$password
      isExternal:$isExternal
    ){
      id
      name
      contact
      email
      isExternal
    }
  }
  
`;

const parameter = (name, contact, email,isExternal,password  )=>{
    let obj ={};
    obj.name = name;
    obj.contact = contact;
    obj.email = email;
    obj.isExternal = isExternal;
    obj.password = password;
    return obj;
}

module.exports.addUser = addUser;
module.exports.parameter = parameter;