# Documentation API

## Mouth(s)

### Collection "/api/mouths"

---

#### GET

```bash
curl -X GET "http://localhost:3000/api/mouths" | python -m json.tool
```

Repsonse :

200 - OK \
Json containing all mouths

---

#### POST

```bash
curl -X POST "http://localhost:3000/api/mouths" -F "file=@./tests/mouth.json" && echo
```

Response :

201 - Resource + Location Header \
Json with a location field

*OR*

400 - Bad Request \
Json explaining the error (No file or too many)

---

#### OTHER

```bash
curl -X PUT "http://localhost:3000/api/mouths" && echo
```

Response :

405 - Method Not Allowed \
Json explaining the error 

### Resource "/api/mouth/:id"

---

#### GET

```bash
curl -X PUT "http://localhost:3000/api/mouth/1" && echo
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
curl -X PUT "http://localhost:3000/api/mouth/1" && echo
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
curl -X PATCH --data-urlencode "type=discord" --data-urlencode "token=discord-token" http://localhost:3000/api/mouth/6 && echo
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

```bash
curl -X POST "http://localhost:3000/api/mouths" && echo
```

Response :

405 - Method Not Allowed \
Json explaining the error 
