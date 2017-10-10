var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");

var con = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "guest",
	password: "test",
	database: "bamazon_db"
});

con.connect(function(err){
	if(err) throw err;
	showItems();
})


var items = new table({
	head: ['Item ID', "Product Name", "Department", "Price", "Stock"],
	colWidths: [10, 40, 30, 15, 10],
	chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '│'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
})

function promptUser(){


	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "Which item ID you'd like to purchase?"
		},
		{
			name: "total",
			type: "input",
			message: "How many would you like to purchase?"
		}
		])
		.then(function(answer){
			
			var total = parseInt(answer.total);
			var id = parseInt(answer.id);
			var qry = "SELECT stock_quantity, price FROM products WHERE item_id = " + id;

			con.query(qry, function(err, res){
				if (err) throw err;
				for (var i = 0; i < res.length; i++) {
					if(parseInt(res[i].stock_quantity) < total){
						console.log("Insufficient quantity! Try again");
						promptUser();
					}
					if(res[i].stock_quantity >= total){
					var amt = res[i].stock_quantity - total;
					var price = res[i].price * total;
					var update = "UPDATE products SET ? WHERE ?"

					con.query(update, [{stock_quantity: amt}, {item_id: id}], function(err, res){
							if(err) throw err;
							console.log("Thank you for your purchase! Your total came to $" + price);
							con.end();
					})
				}
				}
				
			})
			


		});


	};

function showItems(){
	var query = con.query("SELECT * FROM products", function(err, res){
		if (err) throw err;
		var prodArray = [];
		for (var i = 0; i < res.length; i++) {
			items.push(
				[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity] 
				)
		}

		console.log(items.toString());
		console.log("\n");
		promptUser();
		
	})
}
		
	





