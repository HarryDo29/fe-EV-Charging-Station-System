# --- Giai đoạn 1: Build (Dùng Node.js) ---
  FROM node:22.20.0-alpine as build-stage

  WORKDIR /app
  
  # Khai báo build arguments để nhận env vars từ docker compose/workflow
  ARG VITE_BASE_URL
  # Thêm các ARG khác nếu cần
  # ARG VITE_API_KEY
  
  # Set environment variables (Vite sẽ đọc khi build)
  ENV VITE_BASE_URL=$VITE_BASE_URL
  # ENV VITE_API_KEY=$VITE_API_KEY
  
  # Copy package.json và cài thư viện
  COPY package*.json ./
  RUN npm ci
  
  # Copy toàn bộ code và Build
  COPY . .
  RUN npm run build
  
  # --- Giai đoạn 2: Serve (Dùng Nginx) ---
  FROM nginx:alpine as production-stage
  
  # Copy file đã build từ giai đoạn 1 sang thư mục của Nginx
  # (Lưu ý: Vite thường build ra folder 'dist', CRA build ra 'build'. Hãy kiểm tra kỹ)
  COPY --from=build-stage /app/dist /usr/share/nginx/html
  
  # Copy file cấu hình Nginx custom vào
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  
  # Mở cổng 80 (nginx default port trong container)
  EXPOSE 80
  
  # Chạy Nginx
  CMD ["nginx", "-g", "daemon off;"]
