# Upload

`파일` -> 하드디스크
DB와 연관을 짓는다.

`파일`도 마찬가지
요청단계부터 body의 내용이 달라진다.
따라서 새로운 body parser를 사용해야 한다.

## bodyParser

`multer`는 바디를 파서해주는 것으로서
`middleware`로 동작하게 된다.

```js
router.get(
  "/upload",
  (req, res, next) => {
    req.aa = "10";
    next();
  },
  (req, res, next) => {
    req.send(req.aa);
  }
);

router.get("/upload", express(json()), (req, res, next) => {
  req.send(req.aa);
});

router.get("/upload", `multer`, (req, res, next) => {
  req.send(req.aa);
});

이런 식으로 router.get()에다가 핸들러 함수를 2개를 넣을 수 있다.
이는 순차적으로 실행이 되게 된다.
```

## back 4000

## front 3000

- single -> single.html
- array -> array.html

```sh
npm install express nunjucks
npm istall multer
```

## multer

```js
const multer = require("multer");

//
const upload = multer(); // upload에는 object가 할당되게 된다. {single: () => {}, array: () => {}}
upload.single(); // 이것 또한 결과물은 () => {} 핸들러함수가 나오게 된다.
```

## DB 필드에 들어갈 항목들

```sql
id
pw
name
provider (카카오, 구글, 네이버, 로컬 로그인 같은 것을 말하는 것)
image
original_filename
```
