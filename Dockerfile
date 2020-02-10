FROM node:lts-alpine3.10

RUN apk add git && \
    mkdir app && cd app && \
    git clone https://github.com/antoine29/SemiFormal-TripPlanner.git && \
    cd SemiFormal-TripPlanner && git checkout LPZTripPlanner && \
    yarn

WORKDIR /app/SemiFormal-TripPlanner

EXPOSE 9066