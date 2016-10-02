FROM node:0.10.46

COPY app /usr/src/app

RUN cd /usr/src/app/bundle/programs/server\
  && USER=root npm install

CMD ["node", "/usr/src/app/bundle/main.js"]
