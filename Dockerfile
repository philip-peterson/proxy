FROM debian:bookworm-slim AS builder

# Configurable
#ENV PORT="3031"
#ENV ENV="production"
ENV DATABASE_URL=""
ENV GITHUB_CLIENT_ID="foobar"

# Install base deps
RUN apt-get update
RUN apt-get install -y git bash curl

# Install nodenv
RUN git clone https://github.com/OiNutter/nodenv /usr/local/nodenv
RUN mkdir -p /usr/local/nodenv/plugins

# Update env for nodenv
ENV NODENV_ROOT="/usr/local/nodenv"
ENV PATH="$NODENV_ROOT/bin:$NODENV_ROOT/shims:$PATH"

RUN git clone https://github.com/nodenv/node-build.git \
    $NODENV_ROOT/plugins/node-build

# Prepare source tree

WORKDIR /app

COPY ./drizzle /app/drizzle
COPY ./src /app/src

COPY ./package.json /app
COPY ./tsconfig.json /app
COPY ./Dockerfile /app
COPY ./drizzle.config.ts /app
COPY ./yarn.lock /app

# Prepare node

RUN nodenv install 20.19.0 
RUN nodenv global 20.19.0 
RUN npm i -g yarn 
RUN nodenv rehash
RUN yarn install --frozen-lockfile 

# Build frontend

WORKDIR /app/src/frontend
RUN yarn install --frozen-lockfile

WORKDIR /app

RUN yarn run build:backend 
RUN yarn run build:frontend

#COPY ./scripts/entrypoint.sh /app/

#RUN chmod +x /app/entrypoint.sh
#
#ENTRYPOINT ["/app/entrypoint.sh"]
