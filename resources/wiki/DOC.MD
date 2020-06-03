# Documentation API

## Go back :

[README.MD](../../README.md)

## Mouth(s)

### Collection "/api/mouths"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/mouths" | python -m json.tool
```

Response :

200 - OK \
Json containing all mouths

---

#### POST

```bash
curl -X POST "http://localhost:3000/api/mouths" -F "file=@./tests/mouth_web.json" && echo
```

Response :

201 - Resource + Location Header \
Json with a location field

*OR*

400 - Bad Request \
Json explaining the error (No file or too many)

---

#### OTHER

Response :

405 - Method Not Allowed \
Json explaining the error 

Example :
```bash
curl -X PUT "http://localhost:3000/api/mouths" && echo
```

---

### Resource "/api/mouth/:id"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/mouth/1" && echo
```

Response :

200 - OK \
Json containing the mouth 

*OR*

404 - Not Found \
Json explaining the error 

---

#### PUT

```bash
curl -X PUT "http://localhost:3000/api/mouth/1" -F "file=@./tests/mouth_web.json" && echo
```

Response :

200 - Updated \
Json containing the status 

*OR*

201- Created \
Json containing the status 

*OR*

400 - Bad Request \
Json containing the error (No file or too many)

*OR*

404 - Not Found \
Json explaining the error 

---

#### PATCH

```bash
curl -X PATCH --data-urlencode "type=discord" --data-urlencode "token=discord-token" "http://localhost:3000/api/mouth/6" && echo
``` 
Body fields :
* type : "discord" *or* "web"
* token : null *or* \<discord-token\>
* link : null *or* \<discord-link\>

Response :

201 - Updated \
Json containing the status

*OR*

400 - Bad Request \
Json containing the error (No body sended or bad fields)

*OR*

404 - Not Found \
Json explaining the error 

---

#### DELETE

```bash
curl -X DELETE "http://localhost:3000/api/mouth/1" && echo
```

Response :

200 - Deleted
Json explaining the status

*OR*

404 - Not Found \
Json explaining the error

---

#### OTHER

Response :

405 - Method Not Allowed \
Json explaining the error 

Example :

```bash
curl -X POST "http://localhost:3000/api/mouth/1" && echo
```
---

## Brain(s)

### Collection "/api/brains"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/brains" | python -m json.tool
```

Response :

200 - OK \
Json containing all brains

---

#### POST

```bash
curl -X POST "http://localhost:3000/api/brains" -F "file=@./tests/brain.rive" && echo
```

Response :

201 - Resource + Location Header \
Json with a location field

*OR*

400 - Bad Request \
Json explaining the error (No file or too many)

---

#### OTHER


Response :

405 - Method Not Allowed \
Json explaining the error

Example :
```bash
curl -X PUT "http://localhost:3000/api/brains" && echo
```

---

### Resource "/api/brain/:id"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/brain/1" && echo
```

Response :

200 - OK \
Json containing the brain 

*OR*

404 - Not Found \
Json explaining the error 

---

#### PUT

```bash
curl -X PUT "http://localhost:3000/api/brain/2" -F "file=@./tests/brain.rive" && echo
```

Response :

200 - Updated \
Json containing the status 

*OR*

201- Created \
Json containing the status 

*OR*

400 - Bad Request \
Json containing the error (No file or too many)

*OR*

404 - Not Found \
Json explaining the error 

---

#### DELETE

```bash
curl -X DELETE "http://localhost:3000/api/brain/1" && echo
```

Response :

200 - Deleted
Json explaining the status

*OR*

404 - Not Found \
Json explaining the error

---

#### OTHER

Response :

405 - Method Not Allowed \
Json explaining the error 

Example :

```bash
curl -X POST "http://localhost:3000/api/brain/2" && echo
```

---

## Bot(s)

### Collection "/api/bots"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/bots" | python -m json.tool
```

Response :

200 - OK \
Json containing all bots

---

#### POST

```bash
curl -X POST "http://localhost:3000/api/bots" -F "file=@./tests/bot.json" && echo
```

Response :

201 - Resource + Location Header \
Json with a location field

*OR*

400 - Bad Request \
Json explaining the error (No file or too many)

---

#### OTHER


Response :

405 - Method Not Allowed \
Json explaining the error

Example :
```bash
curl -X PUT "http://localhost:3000/api/bots" && echo
```
---

### Resource "/api/bot/:id"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/bot/1" && echo
```

Response :

200 - OK \
Json containing the bot 

*OR*

404 - Not Found \
Json explaining the error 

---

#### PUT

```bash
curl -X PUT "http://localhost:3000/api/brain/2" -F "file=@./tests/brain.rive" && echo
```

Response :

200 - Updated \
Json containing the status 

*OR*

201- Created \
Json containing the status 

*OR*

400 - Bad Request \
Json containing the error (No file or too many)

*OR*

404 - Not Found \
Json explaining the error 

---

#### DELETE

```bash
curl -X DELETE "http://localhost:3000/api/brain/1" && echo
```

Response :

200 - Deleted
Json explaining the status

*OR*

404 - Not Found \
Json explaining the error

---

#### OTHER

Response :

405 - Method Not Allowed \
Json explaining the error 

Example :

```bash
curl -X POST "http://localhost:3000/api/brain/1" && echo
```
