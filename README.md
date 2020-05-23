# texastoc-v2-react-redux

I am rewriting my poker league application from core Spring 3.x and JQuery mobile to Spring Boot and React/Redux.

This is the beginning of writing a new front end using React and Redux.

The following shows what I did step by step.

Each step can be found on the corresponding branch.

To see what was done on a branch compare the code to the previous branch.

## Branches
step-39-web-sockets-for-real
* [step-38-expired-token](#step-38-expired-token)
* [step-37-navbar-icons](#step-37-navbar-icons)
* [step-36-feedback](#step-36-feedback)
* [step-35-paid-players](#step-35-paid-players)
* [step-34-reload](#step-34-reload)
* [step-33-footer](#step-33-footer)
* [step-32-forced-update](#step-32-forced-update)
* [step-31-clear-game-cache](#step-31-clear-game-cache)
* [step-30-final-shake-down](#step-30-final-shake-down)
* [step-29-production-build](#step-29-production-build)
* [step-28-clean-up-ui](#step-28-clean-up-ui)
* [step-27-forgot-password](#step-27-forgot-password)
* [step-26-clock-polling](#step-26-clock-polling)
* [step-25-clock-websocket](#step-25-clock-websocket)
* [step-24-seating-notify](#step-24-seating-notify)
* [step-23-league-players](#step-23-league-players)
* [step-22-seating](#step-22-seating)
* [step-21-refresh-game-spinner](#step-21-refresh-game-spinner)
* [step-20-get-season-when-game-finalized](#step-20-get-season-when-game-finalized)
* [step-19-finalize-game](#step-19-finalize-game)
* [step-18-move-files](#step-18-move-files)
* [step-17-add-first-time-player](#step-17-add-first-time-player)
* [step-16-delete-game-player](#step-16-delete-game-player)
* [step-15-knockout-game-player](#step-15-knockout-game-player)
* [step-14-update-game-player](#step-14-update-game-player)
* [step-13-add-existing-player](#step-13-add-existing-player)
* [step-12-create-new-game](#step-12-create-new-game)
* [step-11-create-new-season](#step-11-create-new-season)
* [step 10 api error handler](#step-10-api-error-handler)
* [step 09 must be logged in](#step-09-must-be-logged-in)
* [step 08 react router bootstrap](#step-08-react-router-bootstrap)
* [step 07 league store](#step-07-league-store)
* [step 06 login api](#step-06-login-api)
* [step 05 season and current game](#step-05-season-and-current-game)
* [step 04 routing](#step-04-routing)
* [step 03 navigation bar](#step-03-navigation-bar)
* [step 02 bootstrap](#step-02-bootstrap)
* [step 01 create development environment](#step-01-create-development-environment)

## step-39-web-sockets-for-real
Using the older stompjs library to listen to the web socket to get the clock.

I had an interesting (frustrating) problem trying to do the right thing and
connect on the componentDidMount function and close the web socket on 
componentWillUnmount function. When two Clock components are created
and one is unmounted then there was a race condition where the call to
setState on the component being unmounted was ignored and hence the 
websocket was not closed.

Worked around the problem by connecting to the web socket in the constructor.

There is no connection retry logic because I want to move up to a newer
library that does the connection retry under the covers. 

## step-38-expired-token
Before calling server check if the token is expired.
If it is then log out and set the store back to the seed data.

When logging in initialize the store by getting the season, game and players.

Used the jsonwebtoken library to decode the token.
* npm install jsonwebtoken --save

Version 2.5

## step-37-navbar-icons
Always show the nav bar icons. Put another way, do not collapse them when
the webpage is narrow.

Version 2.4

## step-36-feedback
Implemented some feedback.

* added a date picker for new game - see https://www.npmjs.com/package/react-datepicker
* one touch to mark a rebuy
* notification when a new version is available

Version 2.3

## step-35-paid-players
Show the number of paid players in the current game.

When updating a player don't show the places already taken.

This is version 2.1.

## step-34-reload
The home page Refresh button changed to Reload. Reload does an http request
for the html page (Refresh was calling apis to update the redux store).

## step-33-footer
Added a component at the bottom of the main page that shows the 
version (e.g. 2.0) that is set in the store.

## step-32-forced-update
Every hour check the internal version against the deployed version and 
if they differ force an html reload to pick up the deployed code.

Had to put an API on the server since attempting to read a _version.json_
file from tomcat proved too difficult (CORS and caching).

## step-31-clear-game-cache
Call the server to clear the game cache when refreshing from home page.

Remove the refresh button from the game page.

## step-30-final-shake-down
This is the last branch that made up version 2.0 Minimal Viable Product (MVP)!

A bunch of little things that came up when testing in a production environment. 
For example use home/lock/unlock icons, only pass the year when creating a season, 
toggling a player as knocked out was broken, ... .

## step-29-production-build
Created a pom.xml to build a war that can be deployed to tomcat.

A war file needs a web.xml so created on of those as well.

## step-28-clean-up-ui
Cleaned up the UI
* better wording
* better flow
* better css style
* icons instead of words on the nav bar
* best of all the menu dropdown from the nav bar is now to the left

Remove the option of flagging that the supplies need to be transported
for a new game. Will add that back later.

## step-27-forgot-password
A normal forgot password flow
* at the login page click the forgot password link
* enter the email used to login.
* the server emails a code.
* enter the code and new password.

## step-26-clock-polling
Poll the clock. Also use the clock controls to resume, pause, backup or move forward.

Also allow a game player to opt in for clock alerts.

## step-25-clock-websocket
Attempted to use a websocket to get message from the server. Tried three ways
* Stomp from 'stompjs';
* Stomp from "@stomp/stompjs
* browser supported WebSocket (that need no import)

I was able to connect to the websocket and get messages using the first 
but it is the oldest technology and will 
require a bunch of code to reconnect.

Was not able to create the websocket for the second.

I was able to connect to the websocket for the third but never received a message. 

Punting on this for now and will come back to it later.

## step-24-seating-notify
Show a button to notify players when they are seated at a game. When pressed call the server
which sends text messages.

## step-23-league-players
Added the ability to see the list of the players in the league and to edit a player.

Need this to set the player's phone number to be able to receive text messages.

## step-22-seating
Seating now working calling server API.

The seating components still use local state while being configured.

## step-21-refresh-game-spinner
Show a spinner when the game is being refreshed.

## step-20-get-season-when-game-finalized
Update the season to pick up the game when a game is finalized.

But after the game is finalized needed the ability to start a new game so added that functionality.

A lot of other little things got done
* Set up the ability to redirect. Using this to redirect to the current game after starting a game.
* Can now reset the client to the "real" state of the server from Home. Puts up a spinner for a few seconds while resetting.
* The league will initialize by getting the league players and current season.
* Adding functions to util.js (e.g. isLoggedIn, redirect, ...).

## step-19-finalize-game
Added the ability to end a game (finalize) and put the game back into edit mode (unfinalize).

The linter called out using double bang (!!). See https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054

## step-18-move-files
For any subdirectories that have only one file (e.g. season had an actions subdirectory)
move that file up to its parent directory and remove the subdirectory.

## step-17-add-first-time-player
The add first time player to a game modal dialog, when submitted, now calls the server
to add the player. If the call to add the first time player is successful then a call
is made to get the current game and the updated game is dispatched to
the reducers which updates the UI.

## step-16-delete-game-player
Very simple to pass the game player id to a call to the server to delet the game player 
and then to call the server to get the game to update the store which updates the UI.

## step-15-knockout-game-player
Added the ability to toggle if a game player is knocked out with a single press of a
user icon in the user list.

Using Font Awesome for React for the icons. See https://fontawesome.com/how-to-use/on-the-web/using-with/react

## step-14-update-game-player
The update game player modal dialog, when submitted, now calls the server
to update the player. If the call to update the player is successful then a call
is made to get the current game and the updated game is dispatched to
the reducers which updates the UI.

## step-13-add-existing-player
The add existing player to a game modal dialog, when submitted, now calls the server
to add the player. If the call to add the player is successful then a call
is made to get the current game and the updated game is dispatched to
the reducers which updates the UI.

## step-12-create-new-game
Check for a current game (a game that is not finalized). If there is one show it. If not, allow the user to create one.

If the user trying to create the game does not have an administrative role
then the api will return a 401. In this case show an unauthorized error message;

## step-11-create-new-season
Check for a current season. If there is one show it. If not, allow the user to create one.

If the user trying to create the season does not have an administrative role
then the api will return a 401. In this case show an unauthorized error message;

## step 10 api error handler
Handle an error when calling an api by
* dispatch an action in the api call catch block
* set the error message in the league store
* show the error message in the Error component
* dismiss the error in the Error component by dispatching an action that clears the error message

Also added the [fontawesome](https://fontawesome.com/) to the project for some nice icons.

## step 09 must be logged in
Did a few things
* added the ability to log out.
* passing the league in the props to all components.
* deny access to some components (e.g. Season, CurrentGame) if the user has not logged in.

To deny access added a check and redirect in the render
```
   if (this.props.league.token === null || this.props.league.token.token === null ) {
     // Must be logged in to view this component
     return (
       <Redirect to='/login'/>
     )
   }
```

## step 08 react router bootstrap
Needed the navigation links to use react routing instead of doing a page load
(because there were href).

Installed react router bootstrap
* npm install react-router-bootstrap --save

Now the navigation header links used react routing.

## step 07 league store
Now using one store (the league store) and hence one connector
(the league connector).

Still using multiple reducers (login, current game and season reducers).

## step 06 login api
Wired up the client with the server by calling the login api to get a token.

Installed Axios (https://github.com/axios/axios) to make make API calls
* npm install --save axios

Created an api.js to initialize axios.

Created a loginClient to use axios to post to the /login api and save the token in the login store.

One note: Brought up the texastoc server locally. Need to enhance its build pipeline to deploy to Heroku.

## step 05 season and current game
I have a react/redux application for the current game. It has its own redux store.
See https://github.com/gpratte/poker-league-current-game

I also have a react/redux application for a season. It too has its own redux store.
See https://github.com/gpratte/poker-league-season

Brought them into this application for the SeasonProxy and CurrentGameProxy.

Note: Had to install a couple of libraries
* npm install --save moment-timezone
* npm install --save react-redux
* npm install --save redux

## step 04 routing
Install react router
* npm install --save react-router-dom

Route to the Home page, SeasonProxy or Current Game from links on the homepage or
from dropdown actions in the navigation bar.

The SeasonProxy and Game are simple placeholder components (for the time being).

## step 03 navigation bar
Added a navigation bar to the top of the page.

## step 02 bootstrap
Oh yeah, it's nice to add Bootstrap to the app for two reasons:

It looks nice. Nice buttons, tables, rows and columns, ...
Functionality - accordions, modal dialogs, ...
React Bootstrap can be found at https://react-bootstrap.github.io/
* npm install --save react-bootstrap bootstrap

Always need lodash
* npm install --save lodash

Now have the simpliest bootstrap landing page.

## step 01 create development environment
To get started did the following.

From https://reactjs.org/docs/create-a-new-react-app.html#create-react-app

* _npx create-react-app texastoc-v2-react-redux_
* _cd texastoc-v2-react-redux_

Removed the .git directory
* _rm -rf .git_

Created github repository texastoc-v2-react-redux
Hooked up react-redux-tutorial with the github repository

* _git init_
* _git add ._
* _git commit -m "initial commit"_
* _git remote add origin https://github.com/gpratte/texastoc-v2-react-redux.git_
* _git push origin master_

Make sure the initial react application works. Run
* _npm start_

should see the default react page in the web browser at http://localhost:3000/

From the redux tutorial "Usage with React" https://redux.js.org/basics/usage-with-react install react-redux
* _npm install --save react-redux_

Push changes to a branch
* _git checkout -b step-01-create-development-environment_
* _git add ._
* _git commit -m "added react-redux npm package"_
* _git push origin step-01-create-development-environment_

Update README.md with the text you are reading :)
* _git add ._
* _git commit -m "update readme"_
* _git push origin step-01-create-development-environment_

Push to master
* _git checkout master_
* _git merge step-01-create-development-environment_
* _git push origin master_
