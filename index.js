const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./library/Manager.js");
const Engineer = require("./library/Engineer.js");
const Intern = require("./library/Intern.js");
const fileName = "./dist/index.html";

let htmlCards = ``;
let job = "Manager";
let finalHtml = ``;

const generalQuestions = [
  {
    type: "input",
    message: "Enter the employee's name.",
    name: "name",
  },
  {
    type: "input",
    message: "Enter the employee's ID",
    name: "id",
  },
  {
    type: "input",
    message: "Enter the employee's email",
    name: "email",
  },
];

const managerQuestions = generalQuestions.concat({
  type: "input",
  message: "Enter the manager's office number",
  name: "officeNumber",
});

const engineerQuestions = generalQuestions.concat({
  type: "input",
  message: "Enter the employee's github.",
  name: "github",
});

const internQuestions = generalQuestions.concat({
  type: "input",
  message: "Enter the intern's university.",
  name: "university",
});

const addEmployee = (answer, job) => {
  const name = answer.name;
  const id = answer.id;
  const email = answer.email;
  const officeNumber = answer.officeNumber;
  const github = answer.github;
  const university = answer.university;

  switch (job) {
    case "Manager":
      employee = new Manager(name, id, email, officeNumber);
      break;
    case "Engineer":
      employee = new Engineer(name, id, email, github);
      break;
    case "Intern":
      employee = new Intern(name, id, email, university);
  }

  employeeCard(employee);
};

const employeeCard = (employee) => {
  let html = ``;
  const role = employee.getRole();

  switch (role) {
    case "Manager":
      html = `<div class='card'>
                 <div class='card-body'>
                   <h2 class='card-title'>${employee.name}</h2>
                   <p class='card-text'>${role}</p>
                 </div>
                    <ul class='list-group list-group-flush'>
                      <li class='list-group-item'>ID: ${employee.id}
                      <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                      <li class="list-group-item">Office Number: ${employee.officeNum}</a></li>
                    </ul>
                </div>`;
      break;
    case "Engineer":
      html = `<div class='card'>
                  <div class='card-body'>
                      <h2 class='card-title'>${employee.name}</h2>
                      <p class='card-text'>${role}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                    <li class="list-group-item">ID: ${employee.id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                    <li class="list-group-item">Github: <a href="https://www.github.com/${employee.github}">${employee.github}</a></li>
                  </ul>
              </div>`;
      break;
    case "Intern":
      html = `<div class='card'>
                          <div class='card-body'>
                              <h5 class="card-title">${employee.name}</h5>
                              <p class="card-text">${role}</p>
                          </div>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">ID: ${employee.id}</li>
                                <li class="list-group-item">Email: <a href="mailto:${employee.email}">${employee.email}</a></li>
                                <li class="list-group-item">University: ${employee.university}</li>
                            </ul>
                        </div>`;
      break;
  }
  htmlCards += html;
};

const htmlCreator = (htmlCards) => {
  finalHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
          integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
          crossorigin="anonymous"
        />
        <link rel='stylesheet' href='./style.css'>
        <title>Team Profile</title>
    </head>
    <body>
        <header>
            <h1 id='heading'>Team</h1>
        </header>
        <main class='container'>
            ${htmlCards}
        </main>
    </body>
    </html>`;
};

const GenerateHtml = (finalHtml) => {
  fs.writeFile(fileName, finalHtml, (err) => {
    err ? console.log("Error!") : console.log("File Created Successfully!");
  });
};

const startInquirer = (questions) => {
  inquirer.prompt(questions).then((answers) => {
    inquirer
      .prompt([
        {
          type: "confirm",
          message: "Would you like to add another employee?",
          name: "add",
        },
      ])
      .then((choice) => {
        addEmployee(answers, job);
        if (choice.add) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "newRole",
                message: "Which role would you like to add?",
                choices: ["Engineer", "Intern"],
              },
            ])
            .then((empChoice) => {
              const userChoice = empChoice.newRole;

              job = userChoice;

              init();
            });
        } else {
          htmlCreator(htmlCards);
          GenerateHtml(finalHtml);
        }
      });
  });
};

const init = () => {
  if (job === "Manager") {
    console.log("Lets start by adding a Manager.");
    startInquirer(managerQuestions);
  } else if (job === "Engineer") {
    startInquirer(engineerQuestions);
  } else if (job === "Intern") {
    startInquirer(internQuestions);
  }
};

init();
