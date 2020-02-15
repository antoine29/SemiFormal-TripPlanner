FROM node:lts-alpine3.10

COPY ./* /SemiFormal-TripPlanner/

RUN cd SemiFormal-TripPlanner && \
    yarn && \
    yarn buildProd && \
    cp example.css dist

ENTRYPOINT ["node server.js"]

WORKDIR /SemiFormal-TripPlanner

EXPOSE 8080