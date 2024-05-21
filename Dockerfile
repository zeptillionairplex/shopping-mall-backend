# 베이스 이미지로 Node.js LTS 버전 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 패키지 설치를 위한 package.json과 package-lock.json 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# Install wait-for-it
RUN apt-get update && apt-get install -y netcat-openbsd jq

COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Ngrok URL 출력 스크립트 복사
COPY get_ngrok_url.sh /usr/src/app/get_ngrok_url.sh
RUN chmod +x /usr/src/app/get_ngrok_url.sh

# 애플리케이션 소스 복사
COPY . .

# Nest CLI 설치
RUN npm install -g @nestjs/cli

# 빌드
RUN npm run build

# 애플리케이션 실행
# CMD ["sh", "-c", "./wait-for-it.sh mysql:3306 -- ./get_ngrok_url.sh && npm run start:dev"]
CMD ["./wait-for-it.sh", "mysql:3306", "--", "npm", "run", "start:dev", "&", "./get_ngrok_url.sh"]

# 앱 노출 포트
EXPOSE 3000