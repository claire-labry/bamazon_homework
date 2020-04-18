var mysql = require ('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'PlantLady!3735',
    database: 'bamazon',
});

connection.connect(function(err){
    if(err) throw err;
    managerList();
});

function managerList() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Hello bAmazon Manager! What would you like to do today?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "exit"
        ]
      })    
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          artistSearch();
          break;
  
        case "Find all artists who appear more than once":
          multiSearch();
          break;
  
        case "Find data within a specific range":
          rangeSearch();
          break;
  
        case "Search for a specific song":
          songSearch();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  }
