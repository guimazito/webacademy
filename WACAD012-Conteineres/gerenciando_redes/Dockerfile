FROM ubuntu:latest

RUN apt-get update -y

RUN apt-get install -y iputils-ping

CMD ["sleep", "1d"]

# docker build -t webacademy-redes .
# docker network create -d bridge rede_webacademy
# docker run -d --name webacademy-redes-1 --network rede_webacademy webacademy-redes
# docker run -d --name webacademy-redes-2 --network rede_webacademy webacademy-redes
# docker exec -it webacademy-redes-1 bash
# ping webacademy-redes-2
# docker exec -it webacademy-redes-2 bash
# ping webacademy-redes-1