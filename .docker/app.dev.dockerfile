############################################################
# Dockerfile para configurar aplicación en node.js - Express
############################################################

# Establece la imagen base
FROM mhart/alpine-node

# Información de Metadata
LABEL name="DEV - Node.js api with docker"
LABEL maintainer="janid.ham20@gmail.com"
LABEL version="1.0"

COPY ./package*.json /usr/src/

WORKDIR /usr/src

RUN npm install --only=production

COPY . /usr/src/

RUN npm install --only=development

EXPOSE 3000

CMD ["npx", "nodemon", "src/app.js"]
