FROM node:12

WORKDIR /

COPY . .

RUN npm install --silent

EXPOSE 3001

CMD ["npm", "start"]