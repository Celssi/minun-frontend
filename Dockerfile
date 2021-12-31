# base image
FROM node:latest as node

# expose port
EXPOSE 80

# set working directory
WORKDIR /app

# install and cache app dependencies
RUN yarn global add serve @angular/cli
COPY . .
RUN yarn install
RUN ng build --configuration production

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/* && rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=node /app/dist /usr/share/nginx/html
