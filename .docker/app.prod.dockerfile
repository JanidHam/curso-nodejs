############################################################
# Dockerfile para configurar aplicación en node.js - Express
############################################################

# Establece la imagen base
FROM mhart/alpine-node:10 as builder

# Información de Metadata
LABEL name="Node.js api with docker"
LABEL maintainer="janid.ham20@gmail.com"
LABEL version="1.0"

COPY ./package*.json /usr/src/

WORKDIR /usr/src

RUN npm install --only=production

COPY [".", "/usr/src/"]

RUN npm install --only=development

RUN npm run lint

RUN npm run test

# Productive image install node
FROM mhart/alpine-node:10

COPY ./package*.json /usr/src/

WORKDIR /usr/src

RUN npm install --only=production

COPY --from=builder ["/usr/src/src", "/usr/src/src"]

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "src/app.js"]
