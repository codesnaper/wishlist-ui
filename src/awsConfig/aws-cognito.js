const awsCognito = {
    userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
	region: process.env.VUE_APP_COGNITO_REGION,
    userPoolWebClientId: process.env.VUE_APP_COGNITO_USEPOOL_CLIENTID,
    mandatorySignIn: true,
    authenticationFlowType: process.env.VUE_APP_COGNITO_AUTHENTICATION_FLOW_TYPE,
}

const api = {
    graphql_endpoint: process.env.VUE_APP_GRAPHQL_URL,
    region: process.env.VUE_APP_COGNITO_REGION,
    apiKey: process.env.VUE_APP_GRAPHQL_APPID,

}

module.exports.cognitoConfig = awsCognito;
module.exports.graphQLAPI = api;
