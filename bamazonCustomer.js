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
    productSearch();
});

function productSearch(){
    inquirer
    .prompt({
        name: 'action',
        type:'list',
        message:'Welcome to bamazon services! What would you like to do today?',
        choices: [
            'I would like to buy some products',
            'No, I\'m not in the mood, please get me out of here.'
        ]
    })

    .then(function(answer){
        switch(answer.action){
            case "Yes,I would like to buy some products":
                productId();
                break;

            case "Thank you for giving the product id, now how many units of this product would you like?":
                unitNumber();
                break;

            case 'No, I\'m not in the mood, please get me out of here':
                connection.end();
                break;
        }
    });
}