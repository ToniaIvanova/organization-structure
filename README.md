## Organization structure

### Table of contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Start project locally](#start-project-locally)
- [Features](#features)
  - [Main page](#main-page)
  - [Add new user](#add-new-user)
  - [Delete user](#delete-user)
  - [Assign manager](#assign-manager)

### Overview

Tool for viewing your profile with pictures.

### Technology Stack

[<img src="https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" alt="nextjs" height="60"/>](https://nextjs.org/) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" height="60"/>](https://react.dev/) [<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlxE-6fq-RHV1KAz0OOLSk12svqXWIjkKaaf2BLNpJYWv4x8QOoURGD5HS2R5Wxz6PDp0&usqp=CAU" alt="react-dom" height="60"/>](https://react.dev/reference/react-dom) [<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" height="60"/>](https://www.typescriptlang.org/) [<img src="https://mui.com/static/logo.png" alt="MUI" height="60"/>](https://mui.com/) [<img src="https://www.vectorlogo.zone/logos/eslint/eslint-icon.svg" alt="eslint" height="60"/>](https://eslint.org/) [<img src="https://prettier.io/icon.png" alt="prettier" height="60"/>](https://prettier.io/)

### Start project locally:

1. Download/clone the project
2. Go to the project root with `cd user-profile` command
3. Run `npm install`
4. Create `.env.local` file from `.env.local.example`
5. Start the project using `npm run start` command (or `npm run dev` to run in dev mode)

Project starts on `http://localhost:3000`

### Features

##### Main page

All organization structure display on main screen. The higher the card is, the higher the person's rank. User's cards are **draggable** and [clickable](#assign-manager). ["Delete"](#delete-user) and ["Assign manager"](#assign-manager) icons are placed on each card. Actions are place on top left: [Add user](#add-new-user), [Hint for change manager](#assign-manager) (available only after subordinate are selected, more details below), [Change manager](#assign-manager) (available only after subordinate and manager are selected, more details below)

![main-page](https://i.ibb.co/tHP7Vgw/Screenshot-2023-12-25-021343.png)

##### Add new user

To add new user tap on `ADD USER` button placed on left top. The drawer for creating new user will open. Type in a new user's name: it should be longer than 2 letters and shorter than 256. Press `SUBMIT` button to create new user. It will re-render the page and display all users with new one.

![add-new-user-form](https://i.ibb.co/CQNKYcg/Screenshot-2023-12-25-012601.png)

##### Delete user

To delete user press delete icon on the user's card. It will re-render the page and display all users without deleted one. All their subordinates will be a root users after deletion.

![delete-icon](https://i.ibb.co/WcwhkPT/Screenshot-2023-12-25-014106.png)

##### Assign manager

To cnage user's manager:
1. Press assign icon on the subordinate's card.

	![assign-manager-icon](https://i.ibb.co/NsSkrPg/Screenshot-2023-12-25-014536.png)

2. Hint for change manager will be placed on top left conor.

	![hint](https://i.ibb.co/VHbWBkk/Screenshot-2023-12-25-014918.png)

3. Now you need to choose a manager for selected subordinate. Just click on selected user's name (card).

	![select-manager](https://i.ibb.co/ZXX3vW1/Screenshot-2023-12-25-015027.png)

	After this action red line will connect two selected users.

	![red-line](https://i.ibb.co/7nyj2bW/Screenshot-2023-12-25-015726.png)

4. Press `CHANGE MANAGER` button that will replace hint for change manager in top left conor.

	![change-manager-button](https://i.ibb.co/23RXVsC/Screenshot-2023-12-25-015952.png)

	It will re-render the page and display all users with new edge. Gif for more details.

	![gif-change-manager](https://i.ibb.co/BtV45yR/new.gif)