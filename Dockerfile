FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production

RUN npm run build
RUN npm prune --production

CMD ["npm", "start"]
EXPOSE 3000