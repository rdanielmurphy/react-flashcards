FROM node:8 as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000

FROM base as development
ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN npm install
COPY .babelrc index.js nodemon.json config/polyfills.js config/env.js config/paths.js config/webpack.config.babel.js config/webpack.config.dev.js config/webpack.config.prod.js config/webpack.config.server.js ./
COPY client ./client
COPY scripts ./scripts
COPY public ./public
COPY server/data ./server
COPY Intl ./Intl
COPY server ./server
CMD ["npm", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build && npm run build:server

FROM base as production
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm install --production
COPY index.js ./
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "run", "start:prod"]