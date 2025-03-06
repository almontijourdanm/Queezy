## Endpoints

List of Available Endpoints:
- `POST /register`
- `POST /login`
- `GET /rooms`
- `POST /rooms`
- `POST /start-game`


### POST /register
#### Description
- Create a new user account

#### Request

- Body
    ```json
    {
      "username": String,
      "email": String,
      "password": String
    }
    ```
#### Response
_201 - Created_
- Body
    ```json
    { 
      "id": integer,
      "username": string,
      "email": string,
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": String
    }
    ```

### POST /login
#### Description
- login to website with access_token

#### Request

- Headers
    ```json
    {
            "Content-Type": "application/x-www-form-urlencoded"
    }
    ```


- Body
    ```json
    {
      "email": String,
      "password": String
    }
    ```
#### Response
_200 - OK_

- Headers
    ```json
    {
            "Content-Type": "application/x-www-form-urlencoded"
    }
    ```

- Body
    ```json
    { 
      "access_token": string,
    }
    ```

_400 - Bad Request_
- Body
    ```json
    {
      "message": String
    }
    ```

### GET /rooms
#### Description
- get the room Quiz

#### Request
- Headers
    ```json
    {
            "Authorization": "Bearer access_token"
    }
    ```

#### Response
_200 - OK_
- Body
    ```json
    { 
      "id": integer,
      "code": string,
      "HostId": integer,
      "questions": [
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        }
      ]
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": String
    }
    ```
_401 - Invalid Token_
- Body
    ```json
    {
      "message": String
    }
    ```

### POST /rooms
#### Description
- create new room Quiz

#### Request
- Headers
    ```json
    {
            "Authorization": "Bearer access_token"
    }
    ```
- Body
    ```json
    {
      "category": String
    }
    ```

#### Response
_201 - Created_
- Body
    ```json
    {
    "id": integer,
    "code": string,
    "questions": [
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        }
    ],
    "HostId": integer,
    "category": string,
    "updatedAt": string,
    "createdAt": string,
    "status": string
    }
    ```

_401 - Invalid Token_
- Body
    ```json
    {
      "message": String
    }
    ```

### POST /start-game
#### Description
- create game-play

#### Request
- Headers
    ```json
    {
            "Authorization": "Bearer access_token"
    }
    ```
- Body
    ```json
    {
    "questions": [
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        },
        {
            "options": [
                string,
                string,
                string,
                string
            ],
            "question": string,
            "correct_answer": string
        }
    ]
    }
    ```

_404 - Not Found_
- Body
    ```json
    {
      "message": String
    }
    ```

_401 - Invalid Token_
- Body
    ```json
    {
      "message": String
    }
    ```