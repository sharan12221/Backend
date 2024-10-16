# Backend

docker build -t backend .
docker tag backend sharanwakade/backend
docker login
docker push sharanwakade/backend

docker run --name backend -p 3050:3050 backend

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