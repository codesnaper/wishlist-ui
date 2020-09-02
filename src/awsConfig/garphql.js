
const graphql = function(query,variable,operation,auth){
    let bodyData = {
        operationName: operation,
        query:query,
        variables:variable
    }
 return fetch(process.env.VUE_APP_GRAPHQL_URL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': auth,
        'accept': '*/*',
        'x-amz-user-agent': 'AWS-Console-AppSync/'
    },
    body: JSON.stringify(bodyData)
});
}

module.exports.graphQL = graphql;

