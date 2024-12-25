FROM node:20-slim as build

ARG BASE_URL
ENV REACT_APP_BASE_URL="$BASE_URL"

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx

COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
