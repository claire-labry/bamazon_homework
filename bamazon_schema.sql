-- Deletes database if exists-- 
DROP DATABASE IF EXISTS bamazon;

-- Creates bamazon database-- 
CREATE DATABASE bamazon;

-- instructs that all code must affect bamazon--  
USE bamazon; 

-- creates the first table called products-- 
CREATE TABLE products (
item_id INT AUTO_INCREMENT,
product_name VARCHAR(75),
department_name VARCHAR(75),
price DECIMAL (10,2),
stock_quanity INT (100)
);