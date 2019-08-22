from settings import *
from dotenv import load_dotenv

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get("POSTGRES_DB_NAME", "ecotek"),
        'USER': os.environ.get("POSTGRES_DB_USER", "ecotek"),
        'PASSWORD': os.environ.get("POSTGRES_DB_PASS", "ecotek"),
        'HOST': os.environ.get("POSTGRES_DB_HOST", "localhost"),
        'PORT': os.environ.get("POSTGRES_DB_PORT", 5432),
    }
}

SECRET_KEY = os.environ.get("SECRET", "supersecret")

DEBUG = os.environ.get("DEBUG", "true") in ["true", "on"]

ALLOWED_HOSTS = [""]

load_dotenv(os.path.join(BASE_DIR, "dev-app.env"))

