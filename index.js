//requirements for running
const Manager = require("./libs/Manager");
const Engineer = require("./libs/Engineer");
const Intern = require("./libs/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
//output directory
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
//rendering requirement
const render = require("./libs/htmlRenderer");

const teamMembers = [];
const emptyId = [];
//First question is always has min 1 manager.
const questionsEmployee = [
    {
        type: "input",
        name: "nameManager",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?"
    },
    {
        type: "input",
        name: "emailManager",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?"
    }
];


function manager() {
    console.log("Let's build your team");
    inquirer.prompt(questionsEmployee).then(function(data){
        const manager = new Manager(data.nameManager, data.managerId, data.emailManager, data.officeNumber);
        teamMembers.push(manager);
        emptyId.push(data.managerId);
        team();
    });
};
//function for more members
function team() {
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "Which type of member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }
    ]).then(function(data){
        if (data.memberChoice === "Engineer"){
            engineer();
        } else if (data.memberChoice === "Intern"){
            intern();
        } else (outputTeam());
    });
};
//engineer spec questions
function engineer() {
    inquirer.prompt([
        {
            type: "input",
            name:"engineerName",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name:"engineerId",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "engineerGithub",
            message: "What is the engineer's GitHub username?"
        }
    ]). then(function(data){
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub);
        teamMembers.push(engineer);
        emptyId.push(data.engineerId);
        team();
    });
};
//intern spec questions
function intern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "internId",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "internSchool",
            message: "What is the intern's school?"
        }
    ]). then(function(data){
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamMembers.push(intern);
        emptyId.push(data.internId);
        team();
    });
};
//file writing function
function outputTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
}

manager();