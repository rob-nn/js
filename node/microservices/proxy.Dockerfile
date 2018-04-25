FROM lgatica/node-zmq:8

USER node
ADD config-proxy.sh config-proxy.sh
RUN ./config-proxy.sh

CMD ["/bin/sh"]
