# bamazon

## Description
This is an Amazon-like storefront application that uses Node.js and MySQL. It also uses the npm inquirer and mysql packages. The app is a command line Node app that has two interfaces: customer and manager.

### Bamazon Customer Interface
When using the app as a Bamazon customer, the user has the ability to view available items to purchase. The user will be prompted to enter the ITEM ID of the item that they would like to order in addition to the quantity. If the item is in stock, the order will be completed and the total cost will be calculated. 

![bamazoncustomer](https://user-images.githubusercontent.com/25389907/30236563-2d0ffc9a-94d1-11e7-8b1e-1b225d18fd1d.PNG)

### Bamazon Manager Interface
The manager interface presents a list of four options, as shown below: 

	? Please select an option: (Use arrow keys)
	❯ View Products for Sale 
	  View Low Inventory 
	  Add to Inventory 
	  Add New Product

The **View Products for Sale** option allows the user to view current inventory of the store. This includes item IDs, product name, department, price, and stock quantity.

![viewproducts](https://user-images.githubusercontent.com/25389907/30236642-dff8f7de-94d2-11e7-9cf3-6a5d327429b4.PNG)

The **View Low Inventory** option allows the user to view which products currently have less than 5 units left.

![lowinventory](https://user-images.githubusercontent.com/25389907/30236670-6ee2b476-94d3-11e7-94d4-84c703a9c9a9.PNG)

The **Add to Inventory** option allows the user to select an item ID and add to that item's current inventory.

![addinventory](https://user-images.githubusercontent.com/25389907/30236676-a058d9c2-94d3-11e7-99d0-82c7226001cd.PNG)

The **Add New Product** option allows the user to enter a new item into the database.

![additem](https://user-images.githubusercontent.com/25389907/30236688-e77666a8-94d3-11e7-955f-696b0499ccd5.PNG)


