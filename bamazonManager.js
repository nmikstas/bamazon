let inquirer   = require("inquirer");
let BamazonSQL = require("./bamazonSQL");

let bamazonSQL;

//Ask the manager which function they would like to perform.
let getInput = function()
{
    inquirer.prompt(
    [
        {
            type: 'list',
            name: 'query_type',
            message: 'Select an operation:',
            choices: 
            [
                'View products for sale',
                'View low inventory',
                'Add to inventory',
                'Add new product',
                'Exit'
            ]
        },
    ]).then(answers =>
    {
        let selection = answers.query_type;
        switch(selection)
        {
            case "View products for sale":
                bamazonSQL.getAllProducts(getInput, true);
                break;
            case "View low inventory":
                bamazonSQL.getLowProducts(getInput, true);
                break;
            case "Add to inventory":
                bamazonSQL.getAllProducts(addInventory, false);
                break;
            case "Add new product":
                addItem();
                break;
            case "Exit":
                bamazonSQL.disconnect();
                break;
            default:
                console.log("Unrecognized Query");
                break;
        }
    });
}

//Add a new item to the database.
let addItem = function(results)
{
    inquirer.prompt
    ([
        {
            name: "productName",
            message: "Enter the product name:",
        },
        {
            name: "departmentName",
            message: "Enter the department:",
        },
        {
            name: "price",
            message: "Enter the cost:",
            validate: value =>
            {
                let val = parseFloat(value);

                if(!isNaN(val))
                {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stockQuantity",
            message: "Enter the quantity:",
            validate: value =>
            {
                let val = parseInt(value);

                if(!isNaN(val))
                {
                    return true;
                }
                return false;
            }
        }
    ]).then(selection =>
    {
        bamazonSQL.addNewItem(getInput, selection.productName, selection.departmentName,
            selection.price, selection.stockQuantity);
    });
}

//Change the stock quantity of an existing databse item.
let addInventory = function(results)
{
    inquirer.prompt
    ([
        {
            name: "productSelection",
            message: "Which product ID would you like to change(0 to quit)?",
            validate: value =>
            {
                let val = parseInt(value);
                if(value === "0") //Exit if user types 0.
                {
                    bamazonSQL.disconnect();
                    process.exit(0);
                }

                if (!isNaN(val) && val > 0 && val <= results.length)
                {
                    return true;
                }

                console.log(" ***Invalid Index!***");
                return false;
            }
        }
    ]).then(selection =>
    {
        //Convert the user's selection into an index.
        let index = parseInt(selection.productSelection) - 1;

        //Get the number of items the customer would like to buy.
        inquirer.prompt
        ([
            {
                name: "productQuantity",
                message: "Change the stock quantity by how much(0 to quit)?",
                validate: value =>
                {
                    let val = parseInt(value);
                    if(value === "0") //Exit if user types 0.
                    {
                        bamazonSQL.disconnect();
                        process.exit(0);
                    }

                    if (!isNaN(val))
                    {
                        return true;
                    }

                    console.log(" ***Invalid Quantity!***");
                    return false;
                }
            }
        ]).then(selection =>
        {
            //Get the value to extract from the existing stock.
            let val = parseInt(selection.productQuantity);

            //Update the database.
            bamazonSQL.changeQuantity(getInput, index, val);
        });
    });
}

try
{
    //Start the manager interface.
    bamazonSQL = new BamazonSQL();
    getInput();
}
catch(err)
{
    console.log(err);
}