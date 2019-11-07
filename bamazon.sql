DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(5,2) DEFAULT 0,
    stock_quantity INT DEFAULT 0,
    product_sales INT DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments
(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NULL,
    over_head_costs DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (department_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("CD Player", "Electronics", 25.00, 15),  ("Couch", "Furniture", 75.00, 5),
       ("Television", "Electronics", 53.00, 30), ("Chair", "Furniture", 15.00, 45),
       ("Envelopes", "Stationary", 1.00, 250),   ("Spatula", "Housewares", 5.50, 23),
       ("Forks", "Housewares", 2.50, 45),        ("TShirt", "Clothing", 7.25, 110),
       ("Pencils", "Stationary", 0.75, 75),      ("Socks", "Clothing", 2.25, 23);
       
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", "1000"), ("Furniture", "500"),
       ("Stationary", "250"),   ("Housewares", "750"),
       ("Clothing", "500");

SELECT * FROM products;
SELECT * FROM departments;