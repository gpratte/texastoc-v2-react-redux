# texastoc-v2-react-redux

I am rewriting my poker league application from core Spring 3.x and JQuery mobile to Spring Boot and React/Redux.

This is the beginning of writing a new front end using React and Redux.

The following shows what I did step by step.

Each step can be found on the cooresponding branch.

## Branches
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

## step-13-add-existing-player
The add existing player to a game modal dialog, when submitted, now calls the server 
to add the player. The call to add the player returns the updated game. The updated 
game is dispatched to the reducers which updates the UI.


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
