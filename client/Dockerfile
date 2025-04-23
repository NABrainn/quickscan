FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm install && npm install @angular/cli
COPY . .
RUN npx ng build --configuration=production

FROM nginx:latest
COPY --from=build /app/dist/scanner-io/browser /data/www
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
RUN rm /etc/nginx/conf.d/*
