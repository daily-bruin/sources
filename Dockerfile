# Use LTS version of node
FROM node:carbon@sha256:a681bf74805b80d03eb21a6c0ef168a976108a287a74167ab593fc953aac34df

ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn --production=false
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 3000

CMD yarn start
