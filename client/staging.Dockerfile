# build stage
FROM node:20-alpine AS build-stage

ARG NODE_ENV=staging
ENV NODE_ENV=${NODE_ENV}

ARG VITE_VERSION
ENV VITE_VERSION=${VITE_VERSION}

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# overwrite robots.txt with staging robots.txt to prevent search engine indexing
RUN cp public/staging.robots.txt public/robots.txt

RUN echo "VITE_VERSION=${VITE_VERSION}" >> .env.staging

RUN npm run build:staging

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
