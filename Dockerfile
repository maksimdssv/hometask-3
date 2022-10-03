FROM node:current as build

WORKDIR /app
COPY package.json  ./
RUN npm install
COPY . /app
RUN npm run build

FROM node:current-alpine

COPY --from=build /app /
EXPOSE 3000
CMD ["npm", "start"]