# Build Stage
FROM public.ecr.aws/docker/library/node:18-alpine AS build-stage
WORKDIR /app
COPY frontend/package.json ./
RUN npm install --registry=https://registry.npmmirror.com
COPY frontend/ .
RUN npm run build

# Production Stage
FROM public.ecr.aws/nginx/nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]