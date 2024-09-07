# build stage
FROM node:20-alpine AS build-stage

ARG VITE_VERSION
ENV VITE_VERSION=${VITE_VERSION}

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

RUN echo "VITE_VERSION=${VITE_VERSION}" >> .env.production

RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
