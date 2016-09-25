FROM node:0.10.46

RUN npm install fibers -g

COPY app /usr/src/app

CMD ["node", "/usr/src/app/bundle/main.js"]
