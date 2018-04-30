## Installation with docker
Install Docker: https://docs.docker.com/install/
Install Docker Compose: https://docs.docker.com/compose/install/

### Installing on Ubuntu 16.04:
> apt-get update

> apt-get install docker-ce

> curl -L https://github.com/docker/compose/releases/download/1.18.0/docker-compose-`uname -s\`-\`uname -m\` -o /usr/local/bin/docker-compose

> chmod 755 /usr/local/bin/docker-compose

If you want to run docker with another user than root, add your username into the docker group

> git clone https://github.com/planetenamek/DiscoSteem-Bot.git

> cd DiscoSteem-Bot

Copy config-example.json as config.json and customize it.

- Build: `docker-compose build` (CTRL + C to exit)
- Launch: `docker-compose up`
- To launch in the background: `docker-compose up -d`
- To stop the container running in the background: `docker-compose down`
- To check the bot output: `docker logs bot --tail 30 --follow`