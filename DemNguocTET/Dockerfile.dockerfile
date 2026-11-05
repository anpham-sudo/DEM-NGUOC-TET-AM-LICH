# Sử dụng Nginx phiên bản nhẹ nhất làm máy chủ web
FROM nginx:alpine

# Copy toàn bộ file code giao diện vào thư mục mặc định của Nginx
COPY . /usr/share/nginx/html

# Mở cổng 80 để cho phép truy cập web
EXPOSE 80