FROM ubuntu:latest

RUN apt-get update

RUN apt-get install -y nginx

ARG PORTA_ARG

ENV PORTA=${PORTA_ARG}

EXPOSE ${PORTA_ARG}

CMD ["nginx", "-g", "daemon off;"]

# docker build -t customizando-imagem .
# docker run -d --name customizando-imagem -p 7000:80 customizando-imagem