# cfp-vote-ui


## Setup for your event

This quick guide should help you to set up this app for your event, using GitHub and Heroku.

### GitHub OAuth Setup

To set up Oauth with github, visit your the Oauth applications page of your GitHub Org, for example https://github.com/organizations/__YOUR_ORG__/settings/applications

![The OAuth menu in your Org Settings](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-menu.png)

Create a new application. For now, enter some random URL in the "Authorization callback URL" and the "Application URL" part. You have to update these a bit later, when the setup is ready.

![New OAuth Application form](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-new-app.png)

When you've saved the new Application, it will show you your OAuth Secrets, similar to this.

![OAuth Secrets](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-secrets.png)

These will be needed by the CFP vote app to authenticate your team members.

### Set up the CFP Vote Service

Follow [this link](https://github.com/JSConfBp/cfp-vote-service) for instructions, the process is similar to this.

### Set up the UI App

1. fork this repo

2. Set up a new Heroku app, using GitHub

3. Fill the Config Vars for the newly created app

API_URL
// the service url

GH_OAUTH_CLIENT_ID
GH_OAUTH_CLIENT_SECRET
// get these from

GH_REDIRECT_URI
// https://__THIS HEROKU APP URL__/oauth
