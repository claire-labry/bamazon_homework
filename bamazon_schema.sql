-- Deletes database if exists-- 
DROP DATABASE IF EXISTS bamazon;

-- Creates bamazon database-- 
CREATE DATABASE bamazon;

-- instructs that all code must affect bamazon--  
USE bamazon; 

-- creates the first table called products-- 
CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(75) NULL,
department_name VARCHAR(75) NULL,
price DECIMAL (10,2) NULL,
stock_quanity INT (100) NULL,
PRIMARY KEY (item_id)
);

-- Selects all products-- 
SELECT * FROM products;

-- Creates new rows of products in the database-- 
-- Product 1: Harry Potter Book-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Harry Potter and the Order of the Phoenix","Books", 13.95, 45);

-- Product 2: Queen Size Bed Sheets-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Queen Size Bed Sheets","Bedroom", 40.00, 100);

-- Product 3: KicthenAid Stand Mixer-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("KitchenAid Stand Mixer","Kitchen", 200.50, 30);

-- Product 4: Zucchini Seeds-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Zucchini Seeds","Garden", 4.99, 197);

-- Product 5: Drill-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Drill","Home Improvement", 150.99, 10);

-- Product 6: Eloquent Javascript-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Eloquent Javascript","Books", 25.00, 25);

-- Product 7: Camping Tent -- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Camping Tent","Outdoor", 300.00, 60);

-- Product 8: Dog Treats-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Dog Treats","Pets", 8.99, 90);

-- Product 9: Gardening Pots-- 
INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES ("Gardening Pots","Garden", 10.95, 85);

-- Product 10: Soccer Ball-- 
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Soccer Ball","Sports", 16.99, 150);