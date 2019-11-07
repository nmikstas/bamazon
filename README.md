# bamazon
### Problem Statement
This assignment simulates a MySQL database system that is being accessed by customers, managers and supervisors. 

### High-level Overview
There are three command line interfaces for this project.  The first one, bamazonCutomer.js allows customers to buy items.  The second interface, bamazomManager.js, is used to update the inventory and add new inventory.  The third interface, bamazonSupervisor.js, shows the department profits and allows for new departments to be added to the database.

### App Instructions
`bamazonCustomer.js` - The customer interface. A customer first sees a list of available items.  They then type in the number ID of the item they want to buy.  The customer is then prompted for the quantity they wish to purchase.  The item ID and quantity are validated and the database is updated.

`bamazonManager.js` - The manager interface. The manager can see all the items in the products database.  The manager can then adjust the quantity available for each item. New items can also be added to the database by the manager.

`bamazonSupervisor.js` - The supervisor interface.  The supervisor can check the profits of each department.  The supervisor can also add new departments.

### App GIFs
Three GIFs are provided.  One for each interface.  The GIFS can be found at the links below:
<https://github.com/nmikstas/bamazon/blob/master/GIFs/bamazonCutomer.gif>
<https://github.com/nmikstas/bamazon/blob/master/GIFs/bamazonManager.gif>
<https://github.com/nmikstas/bamazon/blob/master/GIFs/bamazonSupervisor.gif>


### App Source Link
The application source code can be found at the following link: <https://github.com/nmikstas/bamazon>

### Technologies Used
The following packages were used in this assignment:
1. `mysql` - Accesses the local MySQL database. 
2. `inquirer` - Gathers input from the user with the command line interface.

### My Development Role
As this is an individual homework assignment, I was solely responsible for its design and implementation.