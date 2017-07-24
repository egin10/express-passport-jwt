# express-passport-jwt API
Learn about express use passport-jwt basic

1. clone `git clone https://github.com/egin10/express-passport-jwt.git`
2. run use `node index` or `npm start`
3. use Postman or tools similiar like that for test API
4. you can try for web auth on branch `webAuth`, just switch on there `git checkout webAuth`

Note
---
To test if this works, first log in and copy the token, then open a new Postman tab and change the settings to:

- method: `GET`
- URL: `http://localhost:3000/kiw`
- inside Headers: add `Authorization` and add `token` (JWT .........)

Note: It’s important the Auth header starts with JWT and a whitespace followed by the token, else passport-jwt will not extract it.

Demo : [passport-jwt-basic](https://passport-jwt-basic.herokuapp.com/)

Explore it!