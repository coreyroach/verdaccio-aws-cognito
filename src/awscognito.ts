import { IPluginAuth, Callback, Config, AuthConf } from '@verdaccio/types';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  ICognitoUserPoolData
} from 'amazon-cognito-identity-js';

// @ts-ignore
global.fetch = require('node-fetch');

export interface VerdaccioConfigApp extends Config {
  userPoolId: string;
  clientId: string;
}

export default class AWSCognito implements IPluginAuth<VerdaccioConfigApp> {
  _userPool: CognitoUserPool;

  constructor(config: AuthConf) {
    const userPoolData: ICognitoUserPoolData = {
      UserPoolId: config.userPoolId,
      ClientId: config.clientId
    };
    this._userPool = new CognitoUserPool(userPoolData);
  }

  authenticate(user: string, password: string, cb: Callback): void {
    const authData = {
      Username: user,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: user,
      Pool: this._userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (): void => {
        cb(null, [user]);
      },
      // TODO: Capture new password from form...
      // newPasswordRequired: (attr, req) => {
      //   console.log(attr);
      //   console.log(req);
      //   cognitoUser.completeNewPasswordChallenge('<password>', req, {
      //     onSuccess: (res) => {
      //       console.log(res);
      //       cb(null, false)
      //     },
      //     onFailure: (err) => {
      //       console.log(err);
      //       cb(null, false);
      //     }
      //   });
      // },
      onFailure: (): void => {
        cb(null, false);
      }
    });
  }

  adduser(user: string, password, cb: Callback): void {
    this.authenticate(user, password, cb);
  }

  changePassword(): void {}
}
