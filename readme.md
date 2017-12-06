## Project Setup
- create api folder (back-end)
- create web folder (front-end)
- do ```yarn init```
- do ```yarn add express mongoose body-parser axios```
- do ```yarn add nodemon --dev```
- add ```"nodemon server.js" script```
- create basic server.js template
- create a models directory in the api folder
- create basic init.js template
- add .gitignore file in root directory

## Models

### Product
- brandName: String
- name: String

### IMPORTANT
- ```require('./init')``` in any model
- pass along argument you're trying to display in json