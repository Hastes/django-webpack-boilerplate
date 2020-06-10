FROM python:3.7-alpine

WORKDIR /app/


RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN apk add --update --no-cache postgresql-dev
RUN apk add --no-cache --virtual=build-dependencies wget ca-certificates build-base python3-dev musl-dev

RUN echo "http://dl-3.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
RUN apk update

RUN apk add --update --no-cache libmagic jpeg-dev zlib-dev \
    freetds freetds-dev unixodbc unixodbc-dev libstdc++

RUN pip3 install pipenv gunicorn meinheld 

ADD ./Pipfile .
ADD ./Pipfile.lock .
RUN pipenv install --system --deploy --ignore-pipfile
ADD . .

EXPOSE 8000
