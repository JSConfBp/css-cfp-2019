# cfp-vote-ui


## Setup for your event

This quick guide should help you to set up this app for your event, using GitHub and Heroku.

### GitHub OAuth Setup

To set up Oauth with github, visit your the Oauth applications page of your GitHub Org, for example https://github.com/organizations/__YOUR_ORG__/settings/applications

oauth-secrets.png
oauth-new-app.png
oauth-menu.png

These will be needed by the CFP vote app to authenticate your team members.

### Set up the CFP Vote Service

Follow this link for instructions, the process is similar to this.

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