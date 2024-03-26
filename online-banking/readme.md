# Online Banking System Database
This project was built as a means to learn ExpressJS, handlebars, in conjunction with MySQL (26 March 2023)

## Overview
This simple application acts as a online banking system.

Here is the entity relationship diagram (ERD) of the online banking system:
![alt text](assets/online-banking-erd.webp)

In addition to the ERD, the following schema diagram is also drafted:
![alt text](assets/online-banking-schema.webp)

## Business Needs
`Customers` are able to open multiple `accounts` with a bank. Upon successful login to the system, they will be shown a list of `accounts` that they have with the bank. 

After selecting the desired account, they will be taken to a page showing the present and past `balances` in that particular account number. They will be able to request details of the last 'n' number of `transactions` they have performed. A report may also be generated containing their `transactions`. 

In addition, customers can also make fund transfer to any other account *in the same bank*. They could request for a cheque book, change of `address` or stop payment of cheques. They could also view their monthly and/or annual statements, as well as print out the statements.

## Main Entity of Focus
1. Accounts
2. Addresses
3. Customers (Strong)
4. Transactions
5. Balances

## Reference
* Online Banking Database Example [Database Answer](https://web.archive.org/web/20160309042228/http://databaseanswers.org/data_models/online_banking/index.htm)