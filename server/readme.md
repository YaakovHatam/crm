# Login
example:
```javascript
fetch('http://localhost:14700/auth/login', {
    method: 'POST',
    body: JSON.stringify({user: 'user1@admin.com', pass: '123'}),
    headers: { 'content-type': 'application/json'}
}).then(res => res.text().then(tRes => console.log(tRes)))
```