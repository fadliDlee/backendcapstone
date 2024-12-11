FROM node:18
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV APP_ENV=production
ENV APP_PORT=3002
ENV MODEL_URL="https://storage.googleapis.com/pysche-bucket/my_model/model_structure.json"

CMD [ "npm", "start" ]

EXPOSE 3002
