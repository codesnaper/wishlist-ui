import {Auth} from 'aws-amplify';

const register = function (name,email,password){
    Auth.signUp({
        username:email,
        password: password
    });
}

module.exports.register = register;