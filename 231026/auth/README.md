# Kakao Login

OAuth 2.0 검색 후 공부하기
'kakao developers' 접속한 후 공부하기

# 인가 코드 받기

```js

const REST_API_KEY = "45654acfea156e8a4db2925f2067c009"
const REDIREECT_URI = "
http://localhost:3000/auth/kakao/callback"

const redirectURI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIREECT_URI}&response_type=값`
```

REST API 키 : 45654acfea156e8a4db2925f2067c009

## 요청 헤더

```
GET / HTTP/1.1
3


```
