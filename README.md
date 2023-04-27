# Todo Backend App

This is a simple todo backend app built with NextJS.
All endpoints are retrieved from [this backend project](https://github.com/asajim/todo-app-nestjs)

## Features

* There are two pages, `/` and `/[id]`.
* In home page (`/`), user can
    * See all todo items.
        * Todo items are sorted by last modified date
        * If it's done, the background of todo item would be light green.
        * If it passed the deadline, the background will be light red.
    * Add new todo items using title (required) and deadline (optional, has to ISO8601 string)
* In todo detail page `/[id]`, user can
    * Update a todo item (change its title, add/remove deadline, mark it as done)
    * Remove a todo item

## Getting Started

1. Install Node.js and NPM.
2. Use Node 18 (if you have nvm installed, you can do it by typing `nvm use 18`)
3. Install the dependencies:
   ```
   $ npm install
   ```
4. Start the development server:
   ```
   $ npm run start:dev
   ```
5. Open [backend project](https://github.com/asajim/todo-app-nestjs) and start development server there
6. Open your browser and navigate to `http://localhost:3000`.

## Techstack

* [NextJS](https://nextjs.org/)
* [ChakraUI](https://chakra-ui.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Redux](https://redux.js.org/)
* [Redux-toolkit](https://redux-toolkit.js.org/)

## Future Improvement

* Add testing
* Improve UI design
* To set deadline, user need to type manually. Ideally, this should be a date picker and should only allow valid date to
  be entered.
* Currently, authentication is implemented using username and password variables which defined in env. Ideally this
  should be based on user input, so the app could only be accessed by know person.
* If there's an error during getServerSideProps, user will be redirected to 404 page. Ideally 404 page should only be
  shown when the API call actually returns 404 or the page that user wants to see doesn't exist. If there's an error
  during API call, we should show something else rather than 404 page.
* Add more documentation
