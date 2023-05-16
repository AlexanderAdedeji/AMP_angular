// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.




export const environment = {
  production: false,
  //baseUrl: 'https://localhost:5001/',
  // baseUrl : "http://172.16.2.74/AMPService", //,http://localhost:5000/lassraAMP/Authentication
  authUrl : "lasrraAMP/",
  loginUrl : "Authentication",
  signUpUrl : "Authentication/register",
  searchAChannelUrl : "searchForAChannel",
  logout : "logout",
  AgentsUrl : "lasrraAMP/Agents/getAllAgents",
  GetAllMangers:"lasrraAMP/AgentUser/getAllAgentManagers",
  GetAllSupervisors:"lasrraAMP/AgentUser/getAllAgentSupervisors",
  AgentFullDetails:"lasrraAMP/Agents/getAgentFullDetails",
  CreateNewAgentUrl : "lasrraAMP/Agents/registerNewAgent",
  CreateNewAgentUserUrl : "lasrraAMP/AgentUser/registerNewAgentUser",
  CreateNewAgentManagerUrl:"lasrraAMP/AgentUser/registerNewAgentManager",
  CreateNewDeviceUrl : "lasrraAMP/Devices/createDevices",
  GetAllAgentUserUrl: "lasrraAMP/Agents/getAllAgentUsers",
  GetAllDevicesUrl: "lasrraAMP/Devices/getAllDevices",
  GetAllUserTypes: "lasrraAMP/UserTypes/getAllUserTypes",
  GetAllUser: "lasrraAMP/Users/getAllUsers",
  ActivateAgentUserUrl:"lasrraAMP/AgentUser/activateAgentUser",
  DeActivateAgentUserUrl:"lasrraAMP/AgentUser/DeactivateAgentUser",
  RequestPasswordReset:'lasrraAMP/Users/requestPasswordReset',
  getSingleUser:'lasrraAMP/Users/GetUser',
  GetSingleDevice:'lasrraAMP/Devices/getDevice',
  ActivateDeviceUrl:"lasrraAMP/Devices/activateDevice"  ,
  DeActivateDeviceUrl:"lasrraAMP/Devices/DeactivateDevice"  ,
  assignDeviceToAgentEmployeeUrl:"lasrraAMP/Devices/assignDevice"  ,
  DeleteDeviceUrl:"lasrraAMP/Devices/DeleteDevice"  ,
  unAssignAgentEmployeeFromDeviceUrl:"lasrraAMP/Devices/unAssignEmployeeFromDevice"  ,
 baseUrl : "/urlTest/", // Proxy Url for development"

   // Encryption settings
    encryption : {
    key: "sdfQyeyfgkjujb12@569j':",
    algorithm: 'aes-256-cbc',
},
  // JWT Settings
  jwtDetails : {
    secret: '1234567890', // to sign the token
    // Default values that will be automatically applied unless specified.
    // algorithm: 'HS256',
    // expiresIn: '12h',
    // notBefore: '0s',
    // Other optional values
    key: 'ThisIsMyAppISS',// is used as ISS but can be named iss too
}
 
};
