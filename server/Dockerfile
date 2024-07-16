FROM node:22-slim

RUN apt-get update -y \
  && apt-get install -y openssl

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . .

WORKDIR /usr/src/server

ENV PORT 8080

# Install production dependencies.
RUN npm ci 

EXPOSE 8080

CMD ["npm", "start"]