FROM node:8

LABEL maintainer "Sergi Vos Bosch <me@sergivb01.me>"
LABEL description "A hotspot system for my High School. Handles both hotspot website and block website for the DNS filter server blockpage.."

# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /usr/src/app

COPY package*.json ./

#Not CMD, CMD are executed once image is ran
RUN npm install && npm cache clean --force
COPY . .

RUN rm -rf /var/lib/apt/lists/*

CMD ["npm", "start"]
