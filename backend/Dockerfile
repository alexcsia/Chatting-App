FROM node:20 AS build

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install --include=dev

COPY backend/ .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app/backend/package*.json ./

RUN npm install --only=production

COPY --from=build /app/backend/dist ./dist

ENV NODE_ENV=production

EXPOSE 8080

CMD ["npm", "start"]