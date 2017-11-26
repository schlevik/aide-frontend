# AIDE frontend

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

You need to install `node`, `npm`, `yarn` and `compass`.
Compass must be installed with

* `gem install sass compass`

(On Ubuntu, use `sudo apt-get install ruby ruby-dev` to have the `gem` command
available.)

You can build the project with the following two commands into the `dist/` folder:

* `yarn install` (for downloading and installing dependencies)
* `node_modules/.bin/grunt build` (packaging project)

For testing you can do `node_modules/.bin/grunt serve`, then a server is started
on [http://localhost:9000](http://localhost:9000)

## Backend
You need a running backend instance serving on port `5000`

## Docker
Alternatively, you can build and serve the project by building docker images and serve them.
* `docker build -t "aide-frontend" .` builds a container with the application
* `docker run --name "aide-frontend" -p 8080:80 aide-frontend` runs the integrated web server and listens on port 80 
