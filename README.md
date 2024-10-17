# Backend

docker build -t backend .
docker tag backend sharanwakade/backend
docker login
docker push sharanwakade/backend

docker run --name backend -p 3050:3050 backend

docker run --env-file .env -p 3050:3050 your-app-image        //with env vars
1

# dockerfile

```
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN  npm install
COPY . .
EXPOSE 3050
CMD ["npx", "nodemon", "start"]
```

localhost:3050/get
