ps:
	docker-compose ps
logs:
	docker-compose logs app
up:
	docker-compose up -d
makemigrations:
	docker-compose exec app python manage.py makemigrations
migrate:
	docker-compose exec app python manage.py migrate
stop:
	docker-compose stop
startapp:
	docker-compose exec app python manage.py startapp $(name) 
npm add:
	docker-compose exec static_app npm install $(name) 
createsuperuser:
	docker-compose exec app python manage.py createsuperuser
ash:
	docker-compose exec app ash
reload:
	make stop
	make up