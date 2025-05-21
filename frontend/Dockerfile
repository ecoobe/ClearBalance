FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install --silent  # Исправлено: ci → install
COPY ./public /app/public
COPY ./src /app/src
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx-frontend.conf /etc/nginx/conf.d/default.conf