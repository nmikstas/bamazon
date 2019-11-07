let mysql      = require("mysql");
let printItems = require("./printItems");

let BamazonSQL = function()
{
    this.LOW_INVENTORY = 5;

    this.connection = mysql.createConnection(
    {
        host:     "localhost",
        port:      3306,
        user:     "root",
        password: "root",
        database: "bamazon"
    });

    this.productResults;
    this.departmentResults;
    var self = this;

    //Print all items that are low on inventory.
    this.getLowProducts = function(inputCallback, doPrint)
    {   
        self.connection.query("SELECT * FROM products WHERE stock_quantity <= " + this.LOW_INVENTORY,
        function(err, results)
        {
            if (err) throw err;
            self.productResults = results;
            if(doPrint)printItems.printProducts(self.productResults);
            inputCallback(self.productResults);
        });
    }

    //Print all items in the products table and return the table.
    this.getAllProducts = function(inputCallback, doPrint)
    {   
        self.connection.query("SELECT * FROM products", function(err, results)
        {
            if (err) throw err;
            self.productResults = results;
            if(doPrint)printItems.printProducts(self.productResults);
            inputCallback(self.productResults);
        });
    }

    //Purchase items and update the database.
    this.purchaseProducts = function(index, val)
    {
        let totalSales = self.productResults[index].product_sales;
        totalSales += val * self.productResults[index].price;
        self.connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: parseInt(self.productResults[index].stock_quantity) - val,
                product_sales: totalSales
            },
            {
                item_id: index + 1
            }
        ],
        function(err, res)
        {
            if (err) throw err;
                    
            let totalCost = val * self.productResults[index].price;
            console.log("Thank you for your purchase! Your total is $" + totalCost);
            self.connection.end();
        });
    }

    //Change the quantity of an existing item in the database.
    this.changeQuantity = function(inputCallback, index, val)
    {
        let newVal = self.productResults[index].stock_quantity + parseInt(val)
        
        self.connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newVal
            },
            {
                item_id: index + 1
            }
        ],
        function(err, res)
        {
            if (err) throw err;
            console.log("\nThe quantity of " + self.productResults[index].product_name + 
                " has been updated from " + self.productResults[index].stock_quantity +
                " to " + (self.productResults[index].stock_quantity + parseInt(val)) + "\n");
            inputCallback(self.productResults);
        });
    }

    this.addNewItem = function(inputCallback, item, department, price, quantity)
    {
        self.connection.query("INSERT INTO products SET ?",
        [
            {
                product_name: item,
                department_name: department,
                price: price,
                stock_quantity: quantity
            }
        ],
        function(err, res)
        {
            if (err) throw err;
            console.log("\nThe item '" + item  + "' has been added to the database.\n");
            inputCallback(self.productResults);
        });
    }

    //Print out all the departments.
    this.getDepartments = function(inputCallback)
    {
        let query = "SELECT departments.department_id, products.department_name, departments.department_name, " +
                    "departments.over_head_costs, SUM(products.product_sales) AS department_total " +
                    "FROM departments LEFT JOIN products ON (departments.department_name = products.department_name) " +
                    "GROUP BY products.department_name";
        
        self.connection.query(query, function(err, results)
        {
            if (err) throw err;
            self.departmentResults = results;
            printItems.printDepartments(self.departmentResults);
            inputCallback();
        });
    }
    
    //Add a new department to the departments table.
    this.addNewDepartment = function(inputCallback, department, overhead)
    {
        self.connection.query("INSERT INTO departments SET ?",
        [
            {
                department_name: department,
                over_head_costs: overhead
            }
        ],
        function(err, res)
        {
            if (err) throw err;
            console.log("\nThe department '" + department  + "' has been added to the database.\n");
            inputCallback();
        });
    }
   
    //Close the database connection.
    this.disconnect = function()
    {
        this.connection.end();
    }
}

module.exports = BamazonSQL;
