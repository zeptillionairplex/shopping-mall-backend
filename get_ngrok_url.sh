#!/bin/bash

# Ngrok 인증 토큰 설정
export NGROK_AUTHTOKEN="2ggfeG0DJg6Vpp8hWyCCAxIGBGv_54rbxF3D1zeZZNP8desdR" # 여기에 ngrok 인증 토큰을 넣으세요

# 설정된 토큰을 사용하여 ngrok 인증
ngrok config add-authtoken $NGROK_AUTHTOKEN

# ngrok을 백그라운드에서 포트 3000에 대해 실행
nohup ngrok http 3000 &

# Wait for ngrok to start
sleep 10

# Fetch the public URL from ngrok API
NGROK_URL=$(curl --silent http://localhost:4040/api/tunnels | jq -r '.tunnels[0].public_url')

# Print the URL
echo "Ngrok URL: $NGROK_URL"