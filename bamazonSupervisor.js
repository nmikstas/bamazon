let inquirer   = require("inquirer");
let BamazonSQL = require("./bamazonSQL");

//Ask the manager which function they would like to perform.
let getInput = function(department)
{
    inquirer.prompt(
    [
        {
            type: 'list',
            name: 'query_type',
            message: 'Select an operation:',
            choices: 
            [
                'View product sales by department',
                'Create new department',
                'Exit'
            ]
        },
    ]).then(answers =>
    {
        let selection = answers.query_type;
        switch(selection)
        {
            case "View product sales by department":
                bamazonSQL.getDepartments(getInput);
                break;
            case "Create new department":
                addDepartment();
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
let addDepartment = function(results)
{
    inquirer.prompt
    ([
        {
            name: "departmentName",
            message: "Enter the department name:",
        },
        {
            name: "overhead",
            message: "Enter the overhead cost:",
            validate: value =>
            {
                let val = parseFloat(value);

                if(!isNaN(val))
                {
                    return true;
                }
                return false;
            }
        }
    ]).then(selection =>
    {
        bamazonSQL.addNewDepartment(getInput, selection.departmentName,
            selection.overhead);
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