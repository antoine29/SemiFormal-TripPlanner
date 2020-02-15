FROM node:lts-alpine3.10

WORKDIR /Semiformal-TripPlanner

COPY . .

RUN yarn && \
    yarn buildProd && \
    cp example.css dist

ENTRYPOINT ["node", "server.js"]

EXPOSE 8080