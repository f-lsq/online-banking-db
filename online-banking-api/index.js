// 1. SETUP NPM PACKAGES
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createConnection } = require('mysql2/promise'); // allows connection to a mysql database

const app = express(); 
app.use(cors());
app.use(express.json());


// 2. ROUTES
async function main() {
  const connection = await createConnection({
    'host': process.env.DB_HOST, // server or machine that hosts the database (IP address or web domain name)
    'user': process.env.DB_USER,
    'database': process.env.DB_DATABASE,
    'password': process.env.DB_PASSWORD
  })

  // READ - Reading data from the 'online-banking' database
  app.get('/api/customers', async (req, res) => {
    let [customers] = await connection.execute(
      `SELECT * from Customers`
    )

    customers.forEach((eachCustomer) => {
      eachCustomer.dateOfBirth = convertDateFormat(eachCustomer.dateOfBirth);
    })

    res.json({
      customers
    });
  })

  // app.post('/customers', async (req, res) => {
  //   const {searchTerm} = req.body;
  //   const [customers] = await connection.execute(`SELECT * FROM Customers WHERE name = '${searchTerm}'`)
  //   const customerToSearch = customers[0];

  //   const [accountsToSearch] = await connection.execute(`SELECT * FROM Accounts 
  //   JOIN Account_Types ON Accounts.account_type_id = Account_Types.accountTypeId
  //   WHERE customer_id = ${customerToSearch.customerId}`)

  //   customerToSearch.dateOfBirth = convertDateFormat(customerToSearch.dateOfBirth);
    
  //   accountsToSearch.forEach((eachAccount) => {
  //     eachAccount.dateOpened = convertDateFormat(eachAccount.dateOpened);
  //       // if 'dateClosed' is not null
  //       if (eachAccount.dateClosed) {
  //         eachAccount.dateClosed = convertDateFormat(eachAccount.dateClosed);
  //       }
  //   })  
    
  //   console.log(customerToSearch)
  //   res.render('search-customers', {
  //     customerToSearch,
  //     accountsToSearch
  //   })
  // })

  app.get('/api/accounts/:customerId', async (req,res) => {
    const {customerId} = req.params;

    const [accounts] = await connection.execute(
      `SELECT * from Accounts 
      JOIN Account_Types ON Accounts.account_type_id = Account_Types.accountTypeId
      JOIN Customers ON Accounts.customer_id = Customers.customerId
      WHERE customer_id = ${customerId}`
    )
    
    const [account_types] = await connection.execute(
      `SELECT * from Account_Types`
    )

    accounts.forEach((eachAccount) => {
      eachAccount.dateOpened = convertDateFormat(eachAccount.dateOpened);

      // if 'dateClosed' is not null
      if (eachAccount.dateClosed) {
        eachAccount.dateClosed = convertDateFormat(eachAccount.dateClosed);
      }  
    })

    res.json({
      accounts,
      account_types
    });
  })

  // app.post('/accounts/:customerId', async (req, res) => {
  //   const {customerId} = req.params;
  //   const accountTypeIdSelected = req.body.accountTypeId;
    
  //   let [accounts] = await connection.execute(
  //     `SELECT * from Accounts 
  //     JOIN Account_Types ON Accounts.account_type_id = Account_Types.accountTypeId
  //     JOIN Customers ON Accounts.customer_id = Customers.customerId
  //     WHERE customer_id = ${customerId}`
  //   )

  //   // If accountTypeId is not 0 (all account types)
  //   if (accountTypeIdSelected) {
  //     [accounts] = await connection.execute(
  //       `SELECT * from Accounts 
  //       JOIN Account_Types ON Accounts.account_type_id = Account_Types.accountTypeId
  //       JOIN Customers ON Accounts.customer_id = Customers.customerId
  //       WHERE customer_id = ${customerId} && accountTypeId = ${accountTypeIdSelected}`
  //     )
  //   }

  //   const [account_types] = await connection.execute(
  //     `SELECT * from Account_Types`
  //   )
    
  //   accounts.forEach((eachAccount) => {
  //     eachAccount.dateOpened = convertDateFormat(eachAccount.dateOpened);

  //     // if 'dateClosed' is not null
  //     if (eachAccount.dateClosed) {
  //       eachAccount.dateClosed = convertDateFormat(eachAccount.dateClosed);
  //     }  
  //   })

  //   res.render('accounts', {
  //     accounts,
  //     account_types,
  //     accountTypeIdSelected
  //   })
  // })

  // CREATE - Creating new customer and accounts
  app.post('/api/customers', async (req, res) => {
    const {name, dateOfBirth, gender, contactNumber, email} = req.body;
    await connection.execute(`INSERT INTO Customers (name, dateOfBirth, gender, contactNumber, email) VALUES
    ('${name}', '${dateOfBirth}', '${gender}', '${contactNumber}', '${email}')`)

    res.json({
      "message": "Customer has been added"
    });
  });

  // DELETE - Delete an existing customer's data
  app.delete('/api/customers/:customerId', async (req, res) => {
    const {customerId} = req.params;
    await connection.execute(`DELETE FROM Customers WHERE customerId = ${customerId}`);

     res.json({
      "message": "Customer has been deleted"
     });
  })

  // UPDATE - Update an existing customer's data
  app.put('/api/customers/:customerId', async (req, res) => {
    const {customerId} = req.params;
    const {name, dateOfBirth, gender, contactNumber, email} = req.body;
    await connection.execute(`UPDATE Customers
    SET name='${name}', dateOfBirth = '${dateOfBirth}', gender = '${gender}', contactNumber = '${contactNumber}', email='${email}'
    WHERE customerId = ${customerId}`)

    res.json({
      "message": "Customer has been updated successfully"
    })
  })
}

function convertDateFormat(sqlDate) {
  const newSqlDate = new Date(sqlDate).toISOString().substring(0, 10);
  return newSqlDate;
}

main();


// 3. STARTING THE SERVER
app.listen(3000, ()=>{
  console.log('Server is running')
})