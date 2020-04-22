# bamazon

bamazon (just like Amazon) is a storefront that incorporates Node.js and mySQL.

### Description of bamazon

Bamazon is an app where an user can view items in the store and purchase items from a query (mySQL) and managers can go in and view current inventory, low inventory, add more inventory and add a new product. 

### How to use bamazonCustomer.js

Type in the terminal: node bamazonCustomer.js

This will prompt the terminal to inquire the customer of:  

* What product they would like to buy. 
* Quanity of the product that they would like to buy. 

Then returns the price for the customer and inventory left. If the customer goes over inventory, then the terminal will state 'Insufficent Quantity!'

![](gifs/bamazonCustomer.GIF)

### How to use bamazonManager.js

Type in the terminal: node bamazonManager.js

This will prompt the terminal to ask the manager what action they would like to take, such as: 

* View Products

![](gifs/bamazonManager_viewProduct.GIF)

* View Low Inventory

![](gifs/bamazonManager_lowInventory.GIF)

* Add More Inventory

![](gifs/bamazonManager_addInventory.GIF)

* Add new product

![](gifs/bamazonManager_addProduct.GIF)



### Technology Used

* Node.js
* mySQL Workbench
* Express NPM
* cli-table3 NPM
