# Blog
Simple blog - Put your thoughts on the wall!
# Tech stack
- React with Apollo client
- Graphql with Apollo server
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
1. View GraphQL playground on http://localhost:5000/

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
1. View Blog app on http://localhost:3000/

# Features
- For not signed up users:\
        - Sign up
- For signed up users:\
        - Sign in\
        - Posts list view\
        - Add new post\
        - Single post view\
        - Edit / delete posts that you created\
        - Sign out
