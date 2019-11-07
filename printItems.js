//Prints out the items available for sale in the Bamazon store.
let printProducts = function(itemArray)
{
    const ID_ROW_WIDTH    = 8;
    const PROD_ROW_WIDTH  = 29;
    const DEPT_ROW_WIDTH  = 29;
    const PRICE_ROW_WIDTH = 9;
    const QUANT_ROW_WIDTH = 15;
    const SALES_ROW_WIDTH = 13;

    console.log("\n| item_id | product_name                 | department_name              | price     | stock_quantity | product_sales |");
    console.log("|---------|------------------------------|------------------------------|-----------|----------------|---------------|");

    for(let i = 0; i < itemArray.length; i++)
    {
        //Calculate the number of spaces required to pad the item_id column.
        let idString = "" + itemArray[i].item_id;
        let idPad = ID_ROW_WIDTH - idString.length;
        for(let i = 0; i < idPad; i++)
        {
            idString += " "; 
        }

        //Calculate the number of spaces required to pad the product_name column.
        let prodString = "" + itemArray[i].product_name;
        let prodPad = PROD_ROW_WIDTH - prodString.length;
        for(let i = 0; i < prodPad; i++)
        {
            prodString += " "; 
        }

        //Calculate the number of spaces required to pad the department_name column.
        let deptString = "" + itemArray[i].department_name;
        let deptPad = DEPT_ROW_WIDTH - deptString.length;
        for(let i = 0; i < deptPad; i++)
        {
            deptString += " "; 
        }

        //Calculate the number of spaces required to pad the price column.
        let priceString = "" + itemArray[i].price;
        let pricePad = PRICE_ROW_WIDTH - priceString.length;
        for(let i = 0; i < pricePad; i++)
        {
            priceString += " "; 
        }

        //Calculate the number of spaces required to pad the quantity column.
        let quantString = "" + itemArray[i].stock_quantity;
        let quantPad = QUANT_ROW_WIDTH - quantString.length;
        for(let i = 0; i < quantPad; i++)
        {
            quantString += " "; 
        }

        //Calculate the number of spaces required to pad the product sales column.
        let salesString = "" + itemArray[i].product_sales;
        let salesPad = SALES_ROW_WIDTH - salesString.length;
        for(let i = 0; i < salesPad; i++)
        {
            salesString += " "; 
        }

        //Print the item data.
        console.log("| " + idString + "| " + prodString + "| " + deptString +
                    "| $" + priceString + "| " + quantString + "| $" + salesString + "|");
    }

    console.log("");
}

let printDepartments = function(deptArray)
{
    const DEPT_ID_WIDTH     = 14;
    const DEPT_NAME_WIDTH   = 29;
    const DEPT_COSTS_WIDTH  = 14;
    const DEPT_SALES_WIDTH  = 13;
    const DEPT_PROFIT_WIDTH = 13;

    console.log("\n| department_id | department_name              | over_head_cost | product_sales | total_profit |");
    console.log("|---------------|------------------------------|----------------|---------------|--------------|");

    for(let i = 0; i < deptArray.length; i++)
    {
        //Calculate the number of spaces required to pad the item_id column.
        let idString = "" + deptArray[i].department_id;
        let idPad = DEPT_ID_WIDTH - idString.length;
        for(let i = 0; i < idPad; i++)
        {
            idString += " "; 
        }

        //Calculate the number of spaces required to pad the department_name column.
        let deptString = "" + deptArray[i].department_name;
        let deptPad = DEPT_NAME_WIDTH - deptString.length;
        for(let i = 0; i < deptPad; i++)
        {
            deptString += " "; 
        }

        //Calculate the number of spaces required to pad the over_head_costs column.
        let costString = "" + deptArray[i].over_head_costs;
        let costNum = parseFloat(costString);
        let costsPad = DEPT_COSTS_WIDTH - costString.length;
        for(let i = 0; i < costsPad; i++)
        {
            costString += " "; 
        }

        //Calculate the number of spaces required to pad the product_sales column.
        let salesString = "";
        let salesNum;
        if(deptArray[i].department_total === null)
        {
            salesString = "0";
            salesNum = 0;
        }
        else
        {
            salesString += deptArray[i].department_total;
            salesNum = parseFloat(salesString);
        }
        
        let salesPad = DEPT_SALES_WIDTH - salesString.length;
        for(let i = 0; i < salesPad; i++)
        {
            salesString += " "; 
        }

        //Calculate the total profit and pad it properly.
        let profitTotal = salesNum - costNum;
        let profitString = "";
        if(profitTotal < 0)
        {
            profitString += "-$" + (profitTotal * -1);
        }
        else
        {
            profitString += " $" + profitTotal;
        }

        let profitPad = DEPT_PROFIT_WIDTH - profitString.length;
        for(let i = 0; i < profitPad; i++)
        {
            profitString += " "; 
        }
        
        //Print the department data.
        console.log("| " + idString + "| " + deptString + "| $" + costString + 
                    "| $" + salesString + "| " + profitString + "|");
    }

    console.log("");
}

module.exports =
{
    printProducts:    printProducts,
    printDepartments: printDepartments
};