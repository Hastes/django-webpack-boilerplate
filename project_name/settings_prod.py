from .settings import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get("POSTGRES_DB_NAME", "{{ project_name }}"),
        'USER': os.environ.get("POSTGRES_DB_USER", "{{ project_name }}"),
        'PASSWORD': os.environ.get("POSTGRES_DB_PASS", "{{ project_name }}"),
        'HOST': os.environ.get("POSTGRES_DB_HOST", "localhost"),
        'PORT': os.environ.get("POSTGRES_DB_PORT", 5432),
    }
}

SECRET_KEY = os.environ.get("SECRET", "supersecret")

DEBUG = os.environ.get("DEBUG", "true") in ["true", "on"]

ALLOWED_HOSTS = ["your-project.ru"]

WEBPACK_LOADER["DEFAULT"]["STATS_FILE"] = os.path.join(BASE_DIR, 'bundle/webpack-stats-prod.json')

LOGGING = {
	'version': 1,
	'disable_existing_loggers': False,
	'filters': {
		'require_debug_false': {
			'()': 'django.utils.log.RequireDebugFalse',
		},
		'require_debug_true': {
			'()': 'django.utils.log.RequireDebugTrue',
		},
	},
	'formatters': {
		'django.server': {
			'()': 'django.utils.log.ServerFormatter',
			'format': '[%(server_time)s] %(message)s',
		}
	},
	'handlers': {
		'console': {
			'level': 'INFO',
			'filters': ['require_debug_true'],
			'class': 'logging.StreamHandler',
		},
		'console_debug_false': {
			'level': 'ERROR',
			'filters': ['require_debug_false'],
			'class': 'logging.StreamHandler',
		},
		'django.server': {
			'level': 'INFO',
			'class': 'logging.StreamHandler',
			'formatter': 'django.server',
		},
	},
	'loggers': {
		'django': {
			'handlers': ['console', 'console_debug_false'],
			'level': 'INFO',
		},
		'django.server': {
			'handlers': ['django.server'],
			'level': 'INFO',
			'propagate': False,
		}
	}
}
