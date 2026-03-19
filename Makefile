NAME = inception
COMPOSE = docker compose -f src/docker-compose.yml

all: up

up:
	$(COMPOSE) up --build -d

down:
	$(COMPOSE) down

stop:
	$(COMPOSE) stop

start:
	$(COMPOSE) start

restart:
	$(COMPOSE) restart

logs:
	$(COMPOSE) logs -f

build:
	$(COMPOSE) build

re: down up

clean:
	$(COMPOSE) down -v --rmi local

ps:
	$(COMPOSE) ps

mariadb:
	$(COMPOSE) up --build -d mariadb

wordpress:
	$(COMPOSE) up --build -d wordpress

nginx:
	$(COMPOSE) up --build -d nginx

.PHONY: all up down stop start restart logs build re clean fclean ps mariadb wordpress nginx