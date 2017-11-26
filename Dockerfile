FROM node:6

RUN apt-get update && \
	apt-get install apt-transport-https
RUN curl -sS "https://dl.yarnpkg.com/debian/pubkey.gpg" | apt-key add - && \
	echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
	apt-get update && \
  apt-get install -y ruby ruby-dev yarn

RUN gem install sass compass --no-ri --no-rdoc

EXPOSE 8080

WORKDIR /server
ADD . /server

RUN chown -R node:node .

USER node

RUN yarn install && \
	node_modules/.bin/grunt build && \
	yarn add http-server

CMD ["./node_modules/.bin/http-server", "./dist"]
