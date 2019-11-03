let inquirer   = require("inquirer");
let BamazonSQL = require("./bamazonSQL");

let bamazonSQL;

//Callback function that handles the user input.
let getInput = function(results)
{
    //Get customer's item selection.
    inquirer.prompt
    ([
        {
            name: "productSelection",
            message: "Which product ID would you like to buy(0 to quit)?",
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
        let index = selection.productSelection - 1;

        //Get the number of items the customer would like to buy.
        inquirer.prompt
        ([
            {
                name: "productQuantity",
                message: "How many would you like to buy(0 to quit)?",
                validate: value =>
                {
                    let val = parseInt(value);
                    if(value === "0") //Exit if user types 0.
                    {
                        bamazonSQL.disconnect();
                        process.exit(0);
                    }

                    if (!isNaN(val) && val > 0 && val <= results[index].stock_quantity)
                    {
                        return true;
                    }

                    console.log(" ***Insufficient Quantity!***");
                    return false;
                }
            }
        ]).then(selection =>
        {
            //Get the value to extract from the existing stock.
            let val = selection.productQuantity;

            //Update the database.
            bamazonSQL.purchaseProducts(index, val);
        });
    });
}

try
{
    //Start the customer interface.
    bamazonSQL = new BamazonSQL();
    bamazonSQL.getAllProducts(getInput, true);
}
catch(err)
{
    console.log(err);
}
