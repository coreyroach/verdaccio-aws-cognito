import { IPluginAuth, Callback, Config, AuthConf } from "@verdaccio/types";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ICognitoUserPoolData,
} from 'amazon-cognito-identity-js';

// @ts-ignore
global.fetch = require('node-fetch');

export interface VerdaccioConfigApp extends Config {
  userPoolId: string,
  clientId: string,
}

export default class AWSCognito implements IPluginAuth<VerdaccioConfigApp> {
  private userPool: any;

  constructor(config: AuthConf, stuff: VerdaccioConfigApp) {
    const userPoolData: ICognitoUserPoolData = {
      UserPoolId: config.userPoolId,
      ClientId: config.clientId,
    };
    this.userPool = new CognitoUserPool(userPoolData);
  }

  authenticate(user: string, password: string, cb: Callback) {
    const authData = {
      Username: user,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: user,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (result) => {
        console.log('Success', result);
        cb(null, [user]);
      },
      newPasswordRequired: (attr, req) => {
        console.log(attr);
        console.log(req);
        // TODO: Capture new password from form...
        // cognitoUser.completeNewPasswordChallenge('<password>', req, {
        //   onSuccess: (res) => {
        //     console.log(res);
        //     cb(null, false)
        //   },
        //   onFailure: (err) => {
        //     console.log(err);
        //     cb(null, false);
        //   }
        // });
      },
      onFailure: (err) => {
        console.log('Error', err);
        cb(null, false);
      }
    });
  }

  adduser(user: string, password, cb: Callback) {
    this.authenticate(user, password, cb);
  }

  changePassword() {}

  register_middlewares(config, stuff, app, auth, storage) {
    console.log('this.register_middlewares', auth);
  }
}
