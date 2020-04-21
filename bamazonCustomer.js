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
    productList();
});

function productList(){
    connection.query('SELECT * FROM products', function (err,res){
        if(err)throw err;
        console.log('---------------------------------------');
        console.log(' +++ WELCOME TO THE bAMAZON STORE! +++ ');
        console.log('---------------------------------------');

        for(var i = 0; i<res.length; i++){
            console.log('Product ID: ' + res[i].item_id + 
            ' || Product Name: ' + res[i].product_name + 
            ' || Department: ' + res[i].department_name + 
            ' || Price: ' + res[i].price + 
            ' || In Stock: ' + res[i].stock_quanity);
            console.log('------------------------------------------------------------------------------------------------');
        }
        inquirer
        .prompt({
            name: 'action',
            type:'list',
            message:'Would you like to buy some products today?',
            choices:[
                'Yes,I would like to buy some products',
                'No, I\'m not in the mood to buy anything, please get me out of here'
            ]
            
        })
    
        .then(function(answer){
            switch(answer.action){
                case 'Yes,I would like to buy some products':
                    productId();
                    break;
    
                case 'No, I\'m not in the mood to buy anything, please get me out of here':
                    console.log('Okay, sorry to see you go!');
                    connection.end();
                    break;
            }
        });
        function productId(){
            inquirer
            .prompt([
            {
               name:'id',
                type: 'input',
                message: 'Great! What is the product id?',
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
                message: 'Thank you for the id! How many products would you like to buy?',
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

            connection.query ('SELECT item_id, product_name, price, stock_quanity FROM products WHERE ?', {item_id: answer.id}, function(err,res){
                if(err)throw err;
        
                if (res[0].stock_quanity >= answer.quanity){
                    
                    var inStock = res[0].stock_quanity - answer.quanity;
                    var totalPrice = answer.quanity * res[0].price;
        
                    connection.query(`UPDATE products SET stock_quanity = ${inStock} WHERE item_id = ${answer.id}`, function (err,res){
                        if (err) throw err;
        
                        console.log(`Your total for today is: $${totalPrice}`);
                        console.log(`Total Inventory left: ${inStock}`);
        
                        buyMore();
                    });
                 } 
        
                    else{
                        console.log('Insufficent quanity!');
                        buyMore();
                    }
                });
            })
         };
        
         function buyMore(){
             inquirer
             .prompt([
                 {
                     name: 'continue',
                     type: 'confirm',
                     message: 'Are you interested in buying more products?'
                 }
             ])
             .then(function(answer){
                 if(answer.continue){
                     productId();
                 } else{
                     connection.query('SELECT * FROM products', function(err){
                        if(err) throw err;
                     });
                     console.log('Thank you for shopping with bamazon! See you next time!');
                     connection.end();
                     
                }
             }) 
         }
    });
};