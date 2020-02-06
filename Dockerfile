FROM node:lts-alpine3.10

# MAINTAINER Go About <tech@goabout.com>

ENV BRANCH=LZPTripPlanner \
    JAVA_MX=2G

RUN apk add git && \
    mkdir app && cd app && \
    git clone https://github.com/antoine29/SemiFormal-TripPlanner.git && \
    cd SemiFormal-TripPlanner && git checkout LPZTripPlanner && \
    yarn

COPY ./*.conf .

EXPOSE 9066