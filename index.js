const inquirer = require("inquirer")

const fs = require("fs")

const Employee = require("./libs/Employee")
const Engineer = require("./libs/Engineer")
const Intern = require("./libs/Intern")
const Manager = require("./libs/Manager")

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            message: "Enter your first name:",
            name: "name"
        }, 
        {
            type: "input",
            message: "Enter your email address:",
            name: "email"
        }, 
        {
            type: "input",
            message: "What's your role within the company?",
            name: "role",
            choices: ['manager', 'engineer', 'intern']
        },
        {
            type: "input",
            message: "Enter your github username:",
            name: "username"
        }, ]);
}