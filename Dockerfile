FROM node:22.1.0-alpine
LABEL authors="namu"
RUN mkdir -p /api/auth-service
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY --chown=node:node . .
EXPOSE 8080
CMD ["node", "app.js"]
