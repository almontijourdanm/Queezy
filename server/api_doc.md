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

