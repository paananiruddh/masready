# Stage 1 — build the React SPA
FROM node:24-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy workspace manifests first for layer caching
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml .npmrc ./
COPY artifacts/masready/package.json ./artifacts/masready/
COPY artifacts/mockup-sandbox/package.json ./artifacts/mockup-sandbox/
COPY lib/api-client-react/package.json ./lib/api-client-react/
COPY lib/api-zod/package.json ./lib/api-zod/
COPY lib/api-spec/package.json ./lib/api-spec/
COPY lib/db/package.json ./lib/db/

RUN pnpm install --frozen-lockfile

# Copy source
COPY tsconfig.base.json tsconfig.json ./
COPY artifacts/masready ./artifacts/masready
COPY lib ./lib
COPY seed-data ./seed-data

# Build — BASE_PATH=/ for local deployment (no subdirectory prefix)
RUN PORT=3000 BASE_PATH=/ pnpm --filter @workspace/masready run build

# Stage 2 — serve with nginx
FROM nginx:1.27-alpine

COPY deploy/local/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/artifacts/masready/dist/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
