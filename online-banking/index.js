// 1. SETUP NPM PACKAGES
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const { createConnection } = require('mysql2/promise'); // allows connection to a mysql database

const app = express(); 
app.use(express.urlencoded({extended:false})); // enables form processing
app.set("view engine", "hbs"); // set up view engine
app.use(express.static("public"));

wax.on(hbs.handlebars); // for template inheritance
wax.setLayoutPath("./views/layouts")

require('handlebars-helpers')({
  'handlebars': hbs.handlebars
}); // set up 188 handlebars helpers


// 2. ROUTES
async function main() {
  const connection = await createConnection({
    'host': process.env.DB_HOST, // server or machine that hosts the database (IP address or web domain name)
    'user': process.env.DB_USER,
    'database': process.env.DB_DATABASE,
    'password': process.env.DB_PASSWORD
  })

  // READ - Reading data from the 'online-banking' database
  app.get('/customers', async (req, res) => {
    let [customers] = await connection.execute(
      `SELECT * from Customers`
    )

    res.render('customers', {
      customers
    });
  })

  app.get('/accounts/:customerId', async (req,res) => {
    const {customerId} = req.params;
    console.log(req.params);

    let [accounts] = await connection.execute(
      `SELECT * from Accounts WHERE customer_id = ${customerId}`
    )

    res.render('accounts',{
      accounts
    });
  })
}

main();


// 3. STARTING THE SERVER
app.listen(3000, ()=>{
  console.log('Server is running')
})