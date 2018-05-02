# The Bob Ross Sprint
## _Start with a blank canvas, and end up with a happy little full-stack web app_

This app brings together 6 months of web development training for NSS Cohort 23 in one place. It allows a user to search a movie API to create a watch list of films and rank them after viewing.

As a single-page app, Angular handles the client-side routing, while NodeJS handles interactions with the API, as well as communication with the database.

All the things:

Tech Stack:
1. AngularJS
1. PostgreSQL w/Sequelize
1. NodeJS w/Express
1. CSS w/SASS

Tools:
1. ESlint
1. npm
1. sequelize-cli
1. psql

### Tasks and stuff:
Did you know you can use npm as a task manager? You can even have it do stuff before and after the stuff you want it to do using the `pre` and `post` helpers. _pause for melting faces_.

```json
"scripts": {
  "premy-script": "echo 'about to list files'",
  "my-script": "ls -l",
  "postmy-script": "echo 'omg did you see that?'"
}
```

We can even compile SASS into CSS, just like we did with Grunt, and all without needing SASS globally installed. Totally tubular.

```
"scripts": {
  "sass": "node-sass sass/ -o build/css/"
}

This will compile all of the sass files (that don't start with an underscore) to the build/css/ directory.
```

Big thanks to this @paulcpederson [article](http://paulcpederson.com/articles/npm-run/) for laying out how groovy it is to use npm as a task-runner.

    npm install -g eslint
    npm install rerun-script node-sass concurrently

Create a local install of eslint and a `.eslintrc` file at project root

    eslint --init

Create a `.npmrc` file and add `loglevel=silent` to suppress npm error messages when linting
https://github.com/npm/npm/issues/6124

packages links
https://github.com/eslint/eslint
https://github.com/sass/node-sass
https://www.npmjs.com/package/concurrently

**note** As configured, the npm-as-task-manager setup is a bit wonky, so beware. But it's still included in this repo as a demo of the concept. YMMV

### The db and ORM
This app uses postgres and the sequelize ORM.

`npm install pg pg-hstore sequelize`

You'll also need to have postgres installed on your machine and either use the psql command line tool or pgAdmin GUI. I recommend psql, but it can be a beast to get working properly on Windows machines. Proceed at your own risk.

Create a db for the project on your postgres server. I called mine `movie-watchlist`. Call yours anything you like. And call your mother. She worries.

The sequleize CLI makes it easy to setup your data models. install it globally with `npm install sequelize-cli -g`. Then `sequelize init` in the `app/` directory to add the following goodies:

    ├── config
    │   └── config.json
    ├── migrations
    ├── models
    │   └── index.js
    └── package.json

Change config/config.json to match db settings

sequelize model:create --name User --attributes username:string,email:string,password:string

List of sequelize datatypes: http://docs.sequelizejs.com/en/latest/api/datatypes/

This creates:
models/user.js
migrations/{timestamp}-create-user.js

ignore migrations. This demonstration uses `sequelize.sync({force: true})` to tear down and rebuild the tables each time you choose to run `node create-db.js`. Truly quick and dirty for dev purposes. Just don't try to use that method in production ( insert screaming face emoji here )

You can also wrap your server listener command like this to have `sync` run every time the server restarts:

```js
models.sequelize.sync().then( () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
```

Same dev vs production caveats apply!

### Working with the OMDB API
Get an API key here: http://www.omdbapi.com/apikey.aspx
Use it with this npm package: [IMDB-API](https://www.npmjs.com/package/imdb-api)
Don't push up your api key. Stick it in a separate module and add that to the .gitignore


### Putting it all together

Here's one example of the 'signal flow' happening in this app, so you can add similar functionality and not get lost in the woods forever, eating bark and running from coyotes:

Adding a movie to a user's watchlist:

* add button to a poster in `client/partials/movies.html`
    * add ng-click to pass a the movie's imdbid to a scoped method in `client/controllers/movieCtrl.js`
* The Movie Controller method `addToWatchlist` passes userid and movieid to the Movie Factory's `postToWatchlist` method
    * Where does user id come from? See the note earlier about the event listener in this controller.
* The Movie Factory posts an object containing the user and movie ids to the NodeJS server via the “/watchlist” route
* The server listens on the “/watchlist” post route, and calls its watchlist controller method `saveToWatchlist`.
* The watchlist controller pulls in our Movie model and creates a new movie instance to save to the watchlist table.

Whew. Welcome to full-stack land.
