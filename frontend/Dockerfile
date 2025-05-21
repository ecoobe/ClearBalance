FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY public ./public
COPY src ./src
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx-frontend.conf /etc/nginx/conf.d/default.conf