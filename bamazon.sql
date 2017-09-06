Drop database if exists bamazon_DB;

Create database bamazon_DB;

use bamazon_DB;

Create table products (
    Item_ID integer(11)auto_increment not null,
    Product_Name varchar (50) not null,
    Department_Name varchar (50) not null,
    Price decimal (5, 2)  not null,
    Stock_Quantity integer (50) not null,
    Primary_id (Item_ID)
);

insert into products (Product_Name, Department_Name, Price, Stock_Quantity) 
values ('Bose Soundsport In-Ear Headphones', 'Electronics', 99.99, 50),
        ('25 lb Kettlebell', 'Sports & Outdoors', 19.49, 30),
        ('Speed Jumprope', 'Sports & Outdoors', 8.99, 100),
        ('50-Pack Hangers (Black)', "Home & Kitchen", 17.99, 75),
        ('Mesh Trashcan', 'Home', 9.99, 20),
        ('Wireless Keyboard', 'Electronics', 25.50, 33),
        ('Nike Dri-fit Hat', 'clothing', 17.99, 430),
        ('No-Pull Dog Harness', 'Pets', 21.99, 350),
        ('Breakfast Sandwich Maker', "Home & Kitchen", 23.99, 120),
        ('1TB Portable External Hard Drive', 'Electronics', 54.99, 350);

