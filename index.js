const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// TODO: Write Code to gather information about the development team members, and render the HTML file.

const defaultQuestions = [
  {
    type: "input",
    name: "name",
    message: "Enter name?",
  },
  {
    type: "input",
    name: "employeeId",
    message: "Please enter Employee ID?",
  },
  {
    type: "input",
    name: "email",
    message: "Please enter Email",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "Please enter Office Number",
  },
  {
    type: "list",
    name: "menuList",
    message: "Continue with:",
    choices: [
      { name: "Add an engineer", value: 1 },
      { name: "Add an intern", value: 2 },
      { name: "Finish building the team", value: 3 },
    ],
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "github",
    message: "Please enter github username",
  },
];
const internQuestions = [
  {
    type: "input",
    name: "school",
    message: "Please enter School name",
  },
];

let employees = [];
let selection = 0;

const askQuestion = (questions) => {
  const currentQuestions = [...questions];
  inquirer.prompt(currentQuestions).then((response) => {
    if (selection === 0) {
      const manager = new Manager(
        response.name,
        response.employeeId,
        response.email,
        response.officeNumber
      );
      employees.push(manager);
    } else if (selection === 1) {
      const engineer = new Engineer(
        response.name,
        response.employeeId,
        response.email,
        response.github
      );
      employees.push(engineer);
    } else if (selection === 2) {
      const intern = new Intern(
        response.name,
        response.employeeId,
        response.email,
        response.school
      );
      employees.push(intern);
    }
    switch (response.menuList) {
      case 1:
        currentQuestions.splice(3, 1, ...engineerQuestions);
        selection = 1;
        // askQuestion(questions);

        break;
      case 2:
        currentQuestions.splice(3, 1, ...internQuestions);
        selection = 2;

        break;
      case 3:
        const htmlElement = render(employees);
        writeFile(htmlElement);
        return;
      default:
        selection = 0;
    }

    askQuestion(currentQuestions);
  });
};
askQuestion(defaultQuestions);

const writeFile = (data) => {
  //   var rootDir = path.dirname(require.main.filename);
  fs.writeFile(`${outputPath}`, data, (err) =>
    err ? console.log(err) : console.log(`Team File Generated!`)
  );
};
