# Pull image
docker pull caucalamdev/mgs_dev_build:deal-2025-frontend
# Build 
docker-compose -f docker-compose.dev.yml build
# Xóa các container cũ
docker-compose -f docker-compose.dev.yml down --remove-orphans
# Triển khai các container mới mà không dừng các container cũ
docker-compose -f docker-compose.dev.yml up --no-deps -d --build
# # Xóa các Docker images không được sử dụng bởi bất kỳ container nào
docker image prune -a -f 