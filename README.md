# Bracket Viewer Draft

UI Only bracket viewer.

## Usage

The main page (/) will show active matches, in a 9x9 grid, which can be configurable. On any other tab, one can click on
BKA Logo (or navigate to /add) to find a form where one can type in the next match participants. Once submitted, the
match will appear on the main visualization page on the top-left.

Lastly, there's a persistant match history, located on the /history route.

## Locally

To test locally, run and access the browser on the indicated port:

Install deps by running

```shell
npm i
```

```shell
npm run go
```

To build an image, run:

```shell
npm run docker-build
```

To run locally at the moment, valid firebase environment variables must be provided in the .env

## Dockerized

To run a dockerized version, pull the image and run using. The app will be accessible on port 3000

```shell
npm run docker-run
```

The rows / columns and configurations can be altered by running the docker image with the proper env variables:

```shell
docker run -p 80:80 \
  -v $(pwd)/data:/data \
  -e GRID_COLUMNS=4 \
  -e GRID_ROWS=3 \
  -e MAX_MATCHES=12 \
  tournament-tracker
```