# Variables
# Check if Docker is installed
ifeq (,$(shell which docker))
$(error "Docker is not installed. Please install Docker first")
endif

DOCKER_COMPOSE = $(shell if command -v docker-compose >/dev/null 2>&1; then echo "docker-compose"; else echo "docker compose"; fi)
DOCKER_COMPOSE_FILE = docker-compose.yml

# Colors for terminal output
GREEN = \033[0;32m
RED = \033[0;31m
YELLOW = \033[0;33m
NC = \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

.PHONY: help setup build up down restart logs ps clean test lint install

setup: ## Initial project setup
	@echo "${GREEN}Setting up project...${NC}"
	@if [ ! -f .env ]; then \
		echo "${YELLOW}Creating .env file...${NC}"; \
		cp .env.example .env || echo "No .env.example found. Please create .env manually."; \
	fi
	@echo "${GREEN}Installing dependencies...${NC}"
	@make install
	@echo "${GREEN}Building containers...${NC}"
	@make build
	@echo "${GREEN}Starting services...${NC}"
	@make up
	@echo "${GREEN}Setup complete! Run 'make dev' to start development environment${NC}"

help: ## Show this help message
	@echo 'Usage:'
	@echo '  ${YELLOW}make${NC} ${GREEN}<target>${NC}'
	@echo ''
	@echo 'Targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  ${YELLOW}%-15s${NC} %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build or rebuild services
	@echo "${GREEN}Building containers...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build || { \
		echo "${RED}Build failed. Please check your Docker installation and try again.${NC}"; \
		exit 1; \
	}

up: ## Create and start containers
	@echo "${GREEN}Starting containers...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

down: ## Stop and remove containers
	@echo "${RED}Stopping containers...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

restart: down up ## Restart all containers

logs: ## View output from containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

ps: ## List containers
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

clean: down ## Stop and remove containers, networks, images, and volumes
	@echo "${RED}Cleaning up...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down -v --rmi all --remove-orphans

test: ## Run tests
	@echo "${GREEN}Running tests...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec backend npm run test

lint: ## Run linter
	@echo "${GREEN}Running linter...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec backend npm run lint
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec frontend npm run lint

install: ## Install dependencies
	@echo "${GREEN}Installing backend dependencies...${NC}"
	@cd backend && npm install
	@echo "${GREEN}Installing frontend dependencies...${NC}"
	@cd frontend && npm install

shell-backend: ## Access backend container shell
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec backend sh

shell-frontend: ## Access frontend container shell
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec frontend sh

db-migrate: ## Run database migrations
	@echo "${GREEN}Running database migrations...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec backend npm run typeorm migration:run

db-generate: ## Generate database migration
	@echo "${GREEN}Generating database migration...${NC}"
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec backend npm run typeorm migration:generate

rabbitmq-ui: ## Open RabbitMQ management UI in default browser
	@echo "${GREEN}RabbitMQ Management UI: http://localhost:15672${NC}"
	@echo "Default credentials: guest/guest"

redis-cli: ## Access Redis CLI
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec redis redis-cli

logs-backend: ## View backend logs
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f backend

logs-frontend: ## View frontend logs
	@$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f frontend

dev: setup-dev up logs ## Start development environment and view logs

setup-dev: ## Setup development environment
	@echo "${GREEN}Installing backend dependencies locally...${NC}"
	@cd backend && npm install
	@echo "${GREEN}Installing frontend dependencies locally...${NC}"
	@cd frontend && npm install
	@echo "${GREEN}Development environment ready!${NC}" 