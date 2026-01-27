# Stage 1: Build the React App
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# IMPORTANT: We "bake" the API URL into the code at build time.
# Ensure you add REACT_APP_API_URL in Dokploy Environment variables later.
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine
# Copy the build output to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# (Optional but Recommended) Copy custom nginx config to fix "Refresh 404" errors
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]