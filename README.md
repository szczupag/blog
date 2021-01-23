# Blog
# Tech stack
- React client
- Graphql server with Apollo 
- MongoDB database
# Running locally
## Server setup

1. Setup mongodb
    ```
    docker container run -p 27017:27017 mongo
    ```
1. Install server dependencies
    ```
    npm install
    ```
1. Run server
    ```
    npm start
    ```

## Cliect setup

1. Go to client directory
    ```
    cd client
    
    ```
1. Install client dependencies
    ```
    npm install
    
    ```
1. Run client
    ```
    npm start
    
    ```

# Features
- For not signed up users:\
        - Sign up\
        - Posts list view (Home page)
- For signed up users:\
        - Sign in\
        - Posts list view (Home page)\
        - Add new post\
        - Single post view\
        - Edit / delete posts that you created\
        - Sign out
