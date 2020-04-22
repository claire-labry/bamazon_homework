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
        table.push([res[i].item_id, res[i].product_name, res[i].department_name, '$' + res[i].price, res[i].stock_quanity],
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

  connection.query('SELECT * FROM products', function (err, res){
    if(err) throw err;
    var inventory = []

    for(var i = 0; i < res.length; i++){
      inventory.push(res[i].product_name);
    }
  inquirer
  .prompt([
    {
      name:'id',
      type: 'input',
       message: 'Product ID of the item you would like to add inventory to: ',
       validate: function(value){
        if(isNaN(value) === false && parseInt(value) <= res.length && parseInt(value) > 0){
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
        if(isNaN(value) === false){
               return true;
           } else {
               return false;
           }
       }
   }
])
.then(function(answer){

  connection.query ('SELECT * FROM products', function(err,res){
      if(err)throw err;

      increaseInventory = '';

      for(var i = 0; i < res.length; i++) {
        if(res[i].item_id === parseInt(answer.id)){
          increaseInventory = res[i];
        }
      }
     connection.query('UPDATE products SET ? WHERE ?', [
       {
        stock_quanity: increaseInventory.stock_quanity += parseInt(answer.quanity)
       },
       {
       item_id: increaseInventory.item_id
       }
     ],
     function(err){
       if(err) throw err; 

       console.log('Successfully added more inventory to: ' + answer.quanity + ' ' + increaseInventory.product_name);
       productSale();
        })
      });
    });
  })
};

function addProduct(){

  connection.query('SELECT * FROM products WHERE department_name', function (err, res){
    if(err) throw err;

    for(var i = 0; i < res.length; i++){
      department.push(res[i].department_name);
    }
  })

  inquirer
  .prompt([
    {
      name: 'product',
      type: 'input',
      message: 'Please input the product name that you would like to add:',
      validate: function(value){
        if(value){
          return true;
        } else{
          return false;
        }
      }
    }, 
      {
        name: 'department',
        type: 'list',
        message: 'what dapartment would you like to put this product in?',
        choices: ['Books','Bedrooom','Kitchen', 'Garden', 'Home Improvement', 'Outdoor', 'Pets', 'Sports']
      },
      {
        name: 'price',
        type: 'input',
        message: 'What is the price of the product that you would like to add?',
        validate: function(value){
          if(isNaN(value)=== false){
            return true;
          } else {
            return false;
          }
        }
      },
      {
        name: 'quanity',
        type: 'input',
        message: 'Please provide the quanity of the product that you would like to add:',
        validate: function(value){
          if(isNaN(value)=== false){
            return true;
          } else {
            return false;
          }
        }
      }
  ])
  .then(function(answer){
    connection.query('INSERT INTO products SET ?',{
      product_name: answer.product,
      department_name: answer.department,
      price: answer.price,
      stock_quanity: answer.quanity
    },function(err, res){
      if(err) throw err;
      console.log('You have successfully added a new product to the bamazon inventory!')
    })
    productSale();
  })
}
