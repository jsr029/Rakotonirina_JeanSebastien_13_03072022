# Rakotonirina_JeanSebastien_13_03072022
## Openclassrooms P13 : Use an API for Bank user account with React
# Expected Skills :
- Implement a state manager in a React application
- Interact with an API (Application Programming Interfatce)
- Model an API
- Authenticate to an API

# Installation
1. git clone the repository
2. in each directory (fronten and backend), type npm install in vscode terminal console
3. follow instructions below

## 1. Backend in the directory named Project-10-Bank-API
Project #10 - Argent Bank API
This codebase contains the code needed to run the backend for Argent Bank.

Getting Started
Prerequisites
Argent Bank uses the following tech stack:

Node.js v12
MongoDB Community Server
Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

## Check Node.js version
node --version

## Check Mongo version
mongo --version
Instructions
Fork this repo
Clone the repo onto your computer
Open a terminal window in the cloned project
Run the following commands:
## Install dependencies
npm install

## Start local dev server
npm run dev:server

## Populate database with two users
npm run populate-db
Your server should now be running at http://locahost:27017 and you will now have two users in your MongoDB database!

Populated Database Data
Once you run the populate-db script, you should have two users in your database:

Tony Stark
First Name: Tony
Last Name: Stark
Email: tony@stark.com
Password: password123
Steve Rogers
First Name: Steve,
Last Name: Rogers,
Email: steve@rogers.com,
Password: password456
API Documentation
To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:27017/api-docs

Design Assets
Static HTML and CSS has been created for most of the site and is located in: /designs.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in /designs/wireframes/edit-user-name.png.

And for the API model that you will be proposing for transactitons, the wireframe can be found in /designs/wireframes/transactions.png.
## 2. Frontend
  In the frontend directory, type npm start to start the frontend app
  
# Implement a state manager in a React application
I use the Redux library, so according to the frontend package.json : 

  <div style="width:100%;margin:0 auto">
    <img src="./img/packageJson.PNG" alt="frontend json package image" />
  </div>
  
I installed 
   - "redux": "^4.2.0", the state manager
   - "redux-devtools-extension": "^2.13.9", Dev tools for chrome
   - "redux-state-sync": "^3.1.4", A middleware for redux to sync state in different tabs
   - "redux-thunk": "^2.4.1", Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action.
    
 Middleware (intergiciel in french) is like a bridge between the others applications, tools, bdd to give unified services at users.
 
 # Implementation
   <div style="width:100%;margin:0 auto">
    <img src="./img/indexAtTheRootDir.PNG" alt="frontend json package image" />
  </div>

First, we need to create the store with createStore redux function, then we wrap the App component by Provider component wich contains the store in its props, and then the magic happens. 

1. Actions

We have all actions needed for this app inside ./src/actions/index.jsx

For example, 

export const showForm = () => {

    return {
    
        type: 'SHOWFORM'
        
    }
    
}

  2. Reducers ./src/reducers/showFormReducer.jsx

  Each action normally has got a specific reducer function

  const showFormReducer = (state=true, action) => {

    switch(action.type){
    
        case 'SHOWFORM':
        
            return !state 
            
        default:
        
            return state
            
    }
    
}

export default showFormReducer

  3. Combine reducers

   <div style="width:100%;margin:0 auto">
    <img src="./img/combineReducers.PNG" alt="frontend json package image" />
  </div>

  4. useSelector and dispatch react-redux hooks
   
    <img src="./img/UserProfilePart1.PNG" alt="frontend sign-in component header side image" />
  
    We import showFrom from ./src/actions/index.jsx, and showFormState comes from useSelector (the store).
  
    <img src="./img/UserProfilePart2.PNG" alt="frontend sign-in component return side package image" />
  
    We use dispatch(showForm()) in the handleClick function to fire the action.
    
    <img src="./img/UserProfilePart3.PNG" alt="frontend sign-in component return side package image" />
    
    Finally, with this ternary showFormState ? firstName + ' ' + lastName + ' !' : etc... , we have the final state depends on the click edit name button.

# Model an API
  
  <img src="openapi.yaml" alt="Swagger" />
