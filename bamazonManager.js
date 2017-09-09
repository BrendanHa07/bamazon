var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

connection.connect(function(err) {
    if (err) throw err;
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        name: 'selection'
    }
]).then(function(response)  {
   switch (response.selection) {
       case 'View Products for Sale':
       viewProducts();
       break;
       case 'View Low Inventory':
       viewLowInventory();
       break;
       case 'Add to Inventory':
       addToInventory();
       break;
       case 'Add New Product':
       addNewProduct();
       break;
       default:
       break;
   }
});

function viewProducts() {
    connection.query('SELECT* From products', function(err, inventory) {
        if (err) throw err;
        console.log("Bamazon's Inventory");
        for (var i=0; i < inventory.length; i++) {
            console.log("Item ID: " + inventory[i].Item_ID + " | Product: " + inventory[i].Product_Name  + " | Price: " + inventory[i].Price + " | Quantity: " + inventory[i].Stock_Quantity);
        }
    });
};

function viewLowInventory() {
    connection.query('SELECT* From products WHERE Stock_Quantity < 5', function(err, inventory) {
        if (err) throw err;
        console.log("Bamazon's Inventory")
        for (var i=0; i <inventory.length; i++) {
                console.log("These items have low inventory. Please Address.");
                console.log("Item ID: " + inventory[i].Item_ID + " | Product: " + inventory[i].Product_Name + " | Quantity: " + inventory[i].Stock_Quantity);            
        } if (typeof(inventory) === null || typeof(undefined)) {
            console.log("No low inventory");
            connection.end();
        };
    });
};

function addNewProduct() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What item would you like to add?',
            name: 'productName'

        }, {
            type: 'input',
            message: 'What is the price for the item that you would like to add?',
            name:'price'
        },{
            type:'input',
            message: 'What department does this item belong to?',
            name: 'departmentName'
        },{
            type: 'input',
            message: 'How many items would you like to add to that stock quantity?',
            name: 'quantity'
        }
    ]).then(function(newItem) {
        connection.query('INSERT into products(Product_Name, Price, Department_Name, Stock_Quantity) values(?, ?, ?, ?)', [newItem.productName, newItem.price, newItem.departmentName, newItem.quantity], 
        function(err, inventory) {
            if (err) throw err;
            console.log("Great, " + newItem.productName + " has been added to Bamazon's inventory.");
            viewProducts();
        });
    });
};

function addToInventory() {
    inquirer.prompt([
        {
            type: 'input',
            message:'What is the id of the item that you would like to add to?',
            name: 'itemID'
        }, {
            type: 'input',
            message: 'How many items would you like to add to the inventory of that item?',
            name: 'amount'
        }
    ]).then(function(response) {
        connection.query('SELECT* From products WHERE Item_ID= ' + response.itemID, 
        function(err, selectedItem) {
            if (err) throw err;
            console.log("Great, " + response.amount + " units have been added to the stock quantity.");
            connection.query('UPDATE products SET Stock_Quantity=? WHERE Item_Id=?', [selectedItem[0].Stock_Quantity + Number(response.amount), response.itemID],
            function(err, inventory) {
                if (err) throw err;
                viewProducts();
            })
        });
    });
};