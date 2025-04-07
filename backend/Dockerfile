FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm ls typescript
RUN ./node_modules/.bin/tsc --version

COPY . .

RUN ./node_modules/.bin/tsc && npm run tsc-alias

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]