# Todo Backend App

This is a simple todo backend app built with NextJS.
All endpoints are retrieved from [this backend project](https://github.com/asajim/todo-app-nestjs)

Project are structured as 3-layer-architecture: data, domain, presentation.

* Data contains all logic for API requests and DTOs. It should not contain anything from domain or presentation layer.
* Domain contains business logic, redux, and conversion of DTOs to app-models. It should only depend on some codes from
  data layer but nothing from presentation layer.
* Presentation contains all UI components. It should only depend on some codes from domain layer but nothing from data
  layer.

Three layer architecture are used to ensure that each layer should only be responsible for what they should do, and they
should only access what they are supposed to access to.

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
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
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
* Currently, authentication is implemented using username and password variables which defined in env. Ideally this
  should be based on user input, so the app could only be accessed by know person.
* If there's an error during getServerSideProps, user will be redirected to 404 page. Ideally 404 page should only be
  shown when the API call actually returns 404 or the page that user wants to see doesn't exist. If there's an error
  during API call, we should show something else rather than 404 page.
* Add more documentation
