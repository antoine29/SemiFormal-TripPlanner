# SemiFormal-TripPlanner

This is a TripPlanner front-end application to generate the possible routes that a commuter could use to arrive to a defined place, using the public transport system.

### Why SemiFormal

Usually the TripPlanner applications works with a transport data format called **GTFS**. [GTFS](https://gtfs.org/) is an standar to describe a `formal` transport system with defined schedules, stops, routes, etc. But some cities don't have a `formal` transport system. This TripPlanner application attempts to work with data from formal and informal transport systems.

### Study case

In La Paz city, the capital of Bolivia and in many other cities over the world we can find informal transport systems. In La Paz city we can find the two types of transport systems. The formal transport system (compositen by a net of buses and air rails) and the massive informal transport system (especifically a [Hail and Ride](https://en.wikipedia.org/wiki/Hail_and_ride) transport system compositen by a big net of buses, minibuses and taxies). That's why the author consider that La Paz city has a semi-formal transport system.

<p align="center">
    <img src="./exampleTripPlanner.gif" alt="Size Limit CLI" width="738">
</p>

## How to launch this TripPlanner

This SemiFormal-TripPlanner is compositen by three parts:

1. GTFS data

    You'll need some GTFS data set. For the case of La Paz city you could generate a GTFS zip file with the informal transport routes data from this [repository](https://github.com/antoine29/LaPazPublicTransportRoutes) using this [tool](https://github.com/antoine29/geoJson2gtfs) 

2. back-end application

    You are going to need the last `jar` release build of **OpenTripPlanner**. At this moment the last is `otp-1.4.0.jar` and can be downloaded from [here](https://repo1.maven.org/maven2/org/opentripplanner/otp/).

    Create the next folder structure:
    ```sh
    ~/OTP/
        graphs/
            current/
                yourCity.osm.pbf
                GTFS.zip
        otp-1.4.0.jar
    ```

    Where `yourCity.osm.pbf` is the OSM streets file of the city where the GTFS data was taken. You can dowload these OSM files for almost all cities of the world from [here](https://download.bbbike.org/osm/bbbike/).

    Next you should generate an graph of the GTFS data set. Using the downloaded jar and being in the created OTP folder execute these commands: 

    ```bash
    $ java -Xmx2G -jar otp-1.4.0.jar --build graphs/current
    $ java -Xmx2G -jar otp-1.4.0.jar --router current --graphs graphs --server
    ```

    You should have an OpenTripPlanner instance working in the 8000 port.

1. front-end application

    Clone this repository and execute the next commands:
    ```bash
    $ yarn
    $ yarn start
    ```
    After of this the front-end application should be running at `localhost:9966`

[*slides?](https://antoine29.github.io/SemiFormal-TripPlanner/index.html)

