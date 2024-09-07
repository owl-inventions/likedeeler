# Docker file inspired from https://docs.strapi.io/dev-docs/installation/docker#production-dockerfile

FROM node:20-alpine AS build
ARG NODE_ENV=production

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache chromium build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git && rm -rf /var/cache/apk/* > /dev/null 2>&1
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true"


ENV NODE_ENV=${NODE_ENV}
WORKDIR /opt/
COPY ./package.json ./package-lock.json ./
RUN npm install -g node-gyp
ENV PATH=/opt/node_modules/.bin:$PATH
RUN npm ci
WORKDIR /opt/app

COPY ./ .
RUN npm run build


FROM node:20-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk add --no-cache vips-dev
ENV NODE_ENV=production
WORKDIR /opt/app
COPY --from=build /opt/node_modules ./node_modules
COPY --from=build /opt/app ./
EXPOSE 1337

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app \
    && chown -R pptruser:pptruser /opt/app

# Run everything after as non-privileged user.
USER pptruser

CMD ["npm", "run","start"]
