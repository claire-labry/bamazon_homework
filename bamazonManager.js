var mysql = require ('mysql');
var inquirer = require('inquirer');
var Table = require ('cli-table3') 

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
        message: "Hello bAmazon Manager! What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ]
      })    
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          productSale();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addProduct();
          break;
  
        case "Exit":
          connection.end();
          break;
        }
      });
  }
function productSale(){
  connection.query('SELECT * FROM products', function (err,res){
    if(err)throw err;
    var table = new Table({
      head: ['Product ID', 'Product Name', 'Department', 'Price', 'In Stock'],
      colWidths: [13, 45, 16, 11, 11]
    });

    for(var i = 0; i<res.length; i++){
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity],
      );
    }
    console.log(table.toString());
    managerList();
  });
}

function lowInventory(){
  connection.query('SELECT * FROM products WHERE stock_quanity <=5', function (err,res){
    if(err)throw err;
    var table = new Table({
      head: ['Product ID', 'Product Name', 'Department', 'Price', 'In Stock'],
      colWidths: [13, 45, 16, 11, 11]
    });

    for(var i = 0; i<res.length; i++){
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity],
      );
    }
    console.log(table.toString());
    managerList();
  });
}

function addInventory(){
  inquirer
  .prompt([
    {
      name:'id',
      type: 'input',
       message: 'Please give me the id of the product that you would like to add inventory to.',
       validate: function(value){
           if(isNaN(value)){
               return true;
           } else{

               return false;
           }
       }
   },
   {   name: 'quanity',
       type: 'input',
       message: 'How much inventory would you like to add?',
       validate: function(value){
           if(isNaN(value)){
               return true;
           } else {
               return false;
           }
       }
   }
]);
} 