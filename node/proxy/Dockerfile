FROM lgatica/node-zmq:8

USER node

ADD config-proxy.sh config-proxy.sh
RUN ./config-proxy.sh
RUN mkdir /home/node/app

CMD ["/bin/sh"]
