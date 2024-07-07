
FROM node:22
WORKDIR /app/frontend
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
RUN cp -r build /app/public
