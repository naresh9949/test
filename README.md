# Frontend Template

This project contains Basic code template for various front end applications using ReactJs library.

## Project Structure

* Main app.js where we need to add new routes is defined in src folder along with index.js.
* Under src we have components folder in which we place all our react components (we have used all functional components with hooks here).
* Under src/components we have Home,SharedComponents,Utilities folders.
* Home folder contains Home screen buttons which points to various functions and Maintenance Screen.
* SharedComponents folder contains various shared components that are widely used in the projects.
  * Loaders folder contains Spinner,Loader,Backdrop components.
  * NavBar folder contains Logout,Language,Swiper components.
  * Settings components contains application settings.
  * It also contains Breadcrumbs,Logscreen,Notification,Tabletollbar components.
* Utilities folder contains utility functions such as axiosHandler,languageHandler,themeHandler,storageHandler,themeHandler.
* Each folder in the project contains associated test files.



##  How to run this project locally

Clone the repository and then do the following steps to run the project locally.

1. Install nodejs if not installed on the machine.
2. Install dependencies by running `npm install`  or  `yarn install`.
4. This project requires environment variables so you can check them in .env.local file
4. Run the project locally by running `npm start`. This will open the project in your default browser.



##  How to add env variables

1. Here you need to have two .env files.
  * .env
  * .env.local
2. add env variable in the .env.local file.
4. add the same in .env by following the syntax `REACT_APP_VARIABLE-NAME = #{REACT_APP_VARIABLE-NAME}`
4. Kill the development server and start the server again to add new environment variables.



## Available Scripts

In the project directory, you can run:

### `npm start`  -  Runs the app in the development mode.
It will open [http://localhost:3000](http://localhost:3000) to view it in the browser if the port number is available if not it change the port number accordingly.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
