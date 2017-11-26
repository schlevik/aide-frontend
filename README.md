# AIDE frontend

Frontend for the AIDE project.

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Installation
This guide assumes you use Ubuntu 16.04.

## Build & development

You need to install `node`, `yarn` from their respective package repositories [here](https://nodejs.org/en/download/package-manager/) and [here](https://nodejs.org/en/download/package-manager/) aswell as `npm`, and `compass`.
Compass must be installed with

* `gem install sass compass`

Use `sudo apt-get install ruby ruby-dev` to have the `gem` command available.

You can test the interface with the following two commands:

* `yarn install --ignore-engines` (for downloading and installing dependencies)

For testing you can run `node_modules/.bin/grunt serve`, then a server is started
on [http://localhost:9000](http://localhost:9000)

## Backend
You need a running backend instance serving on port `5000`.