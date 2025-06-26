FROM node:18.16-slim

WORKDIR /home/app

ARG PORTA_ARG

ENV PORTA=${PORTA_ARG}

COPY . .

EXPOSE ${PORTA_ARG}

CMD ["npm", "start"]