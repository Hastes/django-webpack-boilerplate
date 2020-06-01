## Init Project

Run bellow command from your terminal

`django-admin startproject --template=https://github.com/Hastes/django_webpack_boilerplate/archive/master.zip your_project_name`

## How to run

### Before run
You need find & replace all `{{ project_name }}` entity in project to own (django-admin didn't replace it in .yml & Dockerfiles)

### Run project
1. `cd your_project_name/`
2. `npm install` or `yarn install`
3. `npm run start`
4. `python manage.py runserver`

### Run in Docker
1. `cd your_project_name/`
2. `pipenv lock`
3. `make up`

## License

MIT © [Hastes](https://github.com/hastes)
