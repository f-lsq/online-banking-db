-- SQL Schema for Online Banking System
CREATE DATABASE online_banking;

USE online_banking;

-- Create Customers Table
CREATE TABLE Customers (
  customerId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  dateOfBirth DATE NOT NULL,
  gender VARCHAR(1) NOT NULL,
  contactNumber varchar(15) NOT NULL,
  email varchar(255) NOT NULL
);

-- Create Addresses Table
CREATE TABLE Addresses (
  addressId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  streetName VARCHAR(95) NOT NULL,
  unitNumber VARCHAR(45),
  city VARCHAR(35) NOT NULL,
  state VARCHAR(55) NOT NULL,
  country VARCHAR(56) NOT NULL,
  postalCode VARCHAR(11) NOT NULL
);

-- Create Customer_Addresses Table (Many to Many)
CREATE TABLE Customer_Addresses (
  customerAddressId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  customer_id INT UNSIGNED,
  address_id INT UNSIGNED,
  dateFrom DATE NOT NULL,
  dateTo DATE,
  CONSTRAINT fk_customer_addresses_customers FOREIGN KEY (customer_id) REFERENCES Customers(customerId),
  CONSTRAINT fk_customer_addresses_addresses FOREIGN KEY (address_id) REFERENCES Addresses(addressId)
);

-- Create Account_Types Table
CREATE TABLE Account_Types (
  accountTypeId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  accTypeName VARCHAR(255) NOT NULL
);

-- Create Accounts Table
CREATE TABLE Accounts (
  accountId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  currBalance FLOAT NOT NULL,
  dateOpened DATE NOT NULL,
  dateClosed DATE,
  customer_id INT UNSIGNED,
  account_type_id INT UNSIGNED,
  CONSTRAINT fk_accounts_customers FOREIGN KEY (customer_id) REFERENCES Customers(customerId),
  CONSTRAINT fk_accounts_account_types FOREIGN KEY (account_type_id) REFERENCES Account_Types(accountTypeId)
);

-- Create Balances Table
CREATE TABLE Balances (
  balanceId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  balDate DATE NOT NULL,
  balAmount FLOAT NOT NULL,
  account_id INT UNSIGNED,
  CONSTRAINT fk_balances_accounts FOREIGN KEY (account_id) REFERENCES Accounts(accountId)
);

-- Create Transaction_Types Table
CREATE TABLE Transaction_Types (
  transactionTypeId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transactTypeName VARCHAR(255) NOT NULL
);

-- Create Transactions Table
CREATE TABLE Transactions (
  transactionId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  transactDate DATE NOT NULL,
  transactAmount FLOAT NOT NULL,
  transactDescription TEXT,
  account_id INT UNSIGNED,
  transaction_type_id INT UNSIGNED,
  CONSTRAINT fk_transactions_accounts FOREIGN KEY (account_id) REFERENCES Accounts(accountId),
  CONSTRAINT fk_transactions_transaction_types FOREIGN KEY (transaction_type_id) REFERENCES Transaction_Types(transactionTypeId)
);