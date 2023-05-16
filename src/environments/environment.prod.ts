export const environment = {
  production: true,
  baseUrl : "http://172.16.2.74/AMPService/", //,http://localhost:5000/lassraAMP/Authentication
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

    encryption : {
    key: "sdfQyeyfgkjujb12@569j':",
    algorithm: 'aes-256-cbc',
},
  // JWT Settings
  jwtDetails : {
    secret: '1234567890', // to sign the token
    key: 'ThisIsMyAppISS',
}
};
