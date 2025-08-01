# #!/bin/bash

# # Tạo tag dựa trên ngày giờ hiện tại
# TAG=$(date +"%Y%m%d_%H%M%S")
# # Xuất biến môi trường TAG
# export TAG

# # Checkout về branch master
# git checkout master
# # Pull code mới nhất từ remote về
# git pull

# # Build các image mới
# docker-compose -f docker-compose.dev.yml build

# # Xóa các container cũ
# docker-compose -f docker-compose.dev.yml down --remove-orphans

# # Triển khai các container mới mà không dừng các container cũ
# docker-compose -f docker-compose.dev.yml up --no-deps -d --build

# # Xóa các Docker images không được sử dụng bởi bất kỳ container nào
# docker image prune -a -f 


# ! script build image and push to docker hub
# ! build image
docker build  --platform linux/amd64 -t caucalamdev/mgs_dev_build:deal-2025-frontend -f Dockerfile.dev .
# ! tag image
docker tag caucalamdev/mgs_dev_build:deal-2025-frontend caucalamdev/mgs_dev_build:deal-2025-frontend
# ! docker push
docker push caucalamdev/mgs_dev_build:deal-2025-frontend
# ! Xóa các Docker images không được sử dụng bởi bất kỳ container nào
docker image prune -a -f 