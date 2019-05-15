# Verdaccio Auth Plugin via AWS Cognito

`verdaccio-aws-cognito` is an authentication plugin for [Verdaccio](https://github.com/verdaccio/verdaccio).

### *NOTE: this project is WIP and not production ready. See "Known Issues" to track progress.*

## Install

```
npm install -g verdaccio-aws-cognito
```

## Configure

```
auth:
    aws-cognito:
        userPoolId: $COGNITO_USER_POOL_ID
        clientId: $COGNITO_CLIENT_ID
```

## Logging In

To log in using NPM, run:

```
npm adduser --registry  https://your.registry.local
```

## Known Issues

 1. When creating a new user in Cognito, you must reset the password after the first successful login. An update to the UI would be required to handle the capturing of the updated password. Possible solutions / workarounds:
    1. See the comment in the `AWSCognito` class to use `completeNewPasswordChallenge` to explicitly set the password. (Not recommended for production)
    2. Use a separate application connected to the Cognito user pool to manage users.
 2. Currently, the is no process for "forgot password" or "reset password". 

## License
MIT
