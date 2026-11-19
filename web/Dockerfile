FROM node:26.13.1-trixie-slim@sha256:e6bedef217677b276c591795e169840edd9096dbf13f29df8ef8d1856b8820bc AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build && npm prune --omit=dev

FROM nginx/nginx-unprivileged:alpine3.24-perl@sha256:d3411ed56e3a0ecfdc485e584e6c8365d60ce95950e4e8cfc9c26b90e02f116f AS runtime

# nginx fills ${BACKEND_URL} into this file at container start.
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /app/dist /usr/share/nginx/html
