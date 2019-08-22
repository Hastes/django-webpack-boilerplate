FROM alpine:latest

WORKDIR /app/

RUN apk add --no-cache ca-certificates && update-ca-certificates
RUN apk add --update --no-cache python3
RUN apk add --update --no-cache postgresql-dev
RUN apk add --no-cache --virtual=build-dependencies wget ca-certificates build-base python3-dev musl-dev
RUN wget --no-check-certificate "https://bootstrap.pypa.io/get-pip.py" -O /dev/stdout | python3

RUN echo "http://dl-3.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories
RUN echo "ipv6" >> /etc/modules
RUN echo "http://dl-2.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-3.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-4.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories; \
    echo "http://dl-5.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
RUN apk update

RUN apk add --update --no-cache libmagic jpeg-dev zlib-dev libstdc++

RUN apk add --update libffi-dev libxslt-dev libxml2-dev openssl-dev python3-dev freetype-dev libjpeg-turbo-dev libpng-dev

RUN pip3 install pipenv
RUN pip3 install gunicorn meinheld

ADD ./requirements.txt .

RUN pip install -r requirements.txt

ADD . .

EXPOSE 8000

