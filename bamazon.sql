CREATE DATABASE bamazon_db;

USE bamazon_db;


CREATE TABLE products(
	item_id int NOT NULL auto_increment,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price decimal(5, 2),
    stock_quantity int,
    primary key(item_id)
);

use bamazon_db;

select * from products;

select stock_quantity from products where item_id = 5;

drop table products;

insert into products(product_name, department_name, price, stock_quantity) 
	values ("500GB HDD", "Computer Parts", 49.99, 60),
			("8GB DDR4 RAM", "Computer Parts", 81.99, 40),
            ("Logitech Bluetooth Keyboard", "Computer Accessories", 34.99, 35),
            ("Logitech Bluetooth Mouse", "Computer Accessories", 28.99, 35),
            ("12GB Flash Memory Stick", "Computer Accessories", 19.99, 25),
            ("AeroCool Open Air Computer Case", "Computer Parts", 130.50, 30),
            ("Mount-It Adjustable Laptop Stand", "Computer Accessories", 25.50, 20),
            ("Bamazon Basics Neoprene Laptop Sleeve", "Computer Accessories", 14.99, 20),
            ("Bamazon Basics Ergonomic Office Chair", "Office Accessories", 65.75, 15),
            ("Bamazon Basics Desk Calendar", "Office Accessories", 9.99, 30),
            ("Bamazon Basics Office Lamp", "Office Accessories", 14.99, 20);

