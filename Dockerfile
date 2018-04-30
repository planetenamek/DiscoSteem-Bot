FROM node:8

# Set this if needed
#########################
# ENV TZ=Australia/Sydney
# RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY ./ /opt/bot

WORKDIR /opt/bot

RUN npm install
