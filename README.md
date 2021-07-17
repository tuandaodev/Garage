# Garage Management System

## Deployed URL:
- UI: https://garage.freelancerhcm.com/ (Use this URL for testing without build codes)
- API: https://garagedemo2021.azurewebsites.net/

## Features

- Manage location/slot with multiple levels
- Checkin/checkout
- Handle multiple vehicle types

## Tech
- .NET Core
- Angular
- SQL Server

## Installation

Installation guides for API, UI, DB:

### * DB
- Create a new Database in SQLServer with name `Garage` or any name you want.
- Open file `DB/Script.sql` and run it.

### * API

- Open file/solution `API/API.sln` with Visual Studio
- Update `ConnectionStrings:Garage` in `appsettings.json` with the above DB.
- `CTRL + B` to build
- `F5` to run

### * UI
- Open UI folder with Visual Studio Code
- Open Visual Studio Code command line and enter the below commands
```sh
npm i
ng s
```
