
const graphql = function(query,variable,operation,auth,key,endpoint=process.env.VUE_APP_GRAPHQL_URL){
    let headers =  {
        'Content-Type': 'application/json;charset=utf-8',
        'accept': '*/*',
        'x-amz-user-agent': 'AWS-Console-AppSync/'
    };
    if(key){
        headers['x-api-key'] = key;
    }
    if(auth){
        headers.authorization = auth;
    }
    let bodyData = {
        operationName: operation,
        query:query,
        variables:variable
    }
 return fetch(endpoint, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(bodyData)
});
}

module.exports.graphQL = graphql;

