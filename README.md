# cfp-vote-ui


## Setup for your event

This quick guide should help you to set up this app for your event, using GitHub and Heroku.

### Step 1: GitHub OAuth Setup

To set up Oauth with github, visit your the Oauth applications page of your GitHub Org, for example https://github.com/organizations/__YOUR_ORG__/settings/applications

![The OAuth menu in your Org Settings](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-menu.png)

Create a new application. For now, enter some random URL in the "Authorization callback URL" and the "Application URL" part. You have to update these a bit later, when the setup is ready.

![New OAuth Application form](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-new-app.png)

When you've saved the new Application, it will show you your OAuth Secrets, similar to this.

![OAuth Secrets](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/oauth-secrets.png)

These will be needed by the CFP vote app to authenticate your team members.

### Step 2: Set up the CFP Vote Service

Follow [this link](https://github.com/JSConfBp/cfp-vote-service) for instructions, the process is similar to this.

### Step 3: Set up the UI App

Fork this repo, then go to Heroku and create a new App there. Connect it to GitHub, you can turn on automatic deployments

![Connect your Heroku app to GitHub](https://raw.githubusercontent.com/JSConfBp/cfp-vote-ui/master/docs/heroku-github-connect.png)

If your App is connected to GitHub, go to it's Settings tab, and edit the config vars:

* **API_URL**  
the service url that you set up in Step 2

GH_OAUTH_CLIENT_ID
GH_OAUTH_CLIENT_SECRET
// get these from

GH_REDIRECT_URI
// https://__THIS HEROKU APP URL__/oauth

### Do not forget to update your GitHub OAuth app URLs!


