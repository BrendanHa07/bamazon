var mysql = require('mysql');
var inquirer = require('inquirer');

// Link to mySQL database
var connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'bamazon_DB'
});

// Connect to database
connection.connect(function(err) {
    if (err) throw err;
    console.log("You have connected to " + connection.threadId);
});

// Function to display inventory
function displayInventory() {
    connection.query('SELECT* FROM products', function(err, inventory) {
        if (err) throw err;
        console.log("Bamazon's Inventory");
        for (var i=0;i < inventory.length; i++) {
            console.log("Item ID: " + inventory[i].Item_ID + " | Product: " + inventory[i].Product_Name + " | Department: " + inventory[i].Department_Name + " | Price: " + inventory[i].Price + " | Quantity: " + inventory[i].Stock_Quantity);
        }
        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the ID of the item you would like to buy?',
                name: "id"
            }, {
                type:'input',
                message: 'How many would you like to buy?',
                name:'quantity'
            }
        ]).then(function(result) {
            var quantity = result.quantity;
            var itemId = result.id;
            connection.query('SELECT* From products WHERE Item_Id = ' + itemId, function(err, selectedItem) {
                if (err) throw err;
                if (selectedItem[0].Stock_Quantity - quantity >= 0) {
                    console.log("There is enough of that item in stock!");
                    console.log("Quantity in stock: " + selectedItem[0].Stock_Quantity);
                    console.log("You will be charged: " + result.quantity*selectedItem[0].Price + " dollars. Thank you for shopping with Bamazon!");
                    connection.query('UPDATE products SET Stock_Quantity=? WHERE Item_Id=?', [selectedItem[0].Stock_Quantity - quantity, itemId], function(err, inventory) {
                        if (err) throw err;
                    });
                } else {
                    console.log("Insufficient Inventory! Bamazon only has " + selectedItem[0].Stock_Quantity + " of that item left.");
                    displayInventory();
                }
            });
        })
    })
};

displayInventory();