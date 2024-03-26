-- Sample INSERT Statements for Online Banking System
USE online_banking;

-- Inserting data into Customers
INSERT INTO Customers (name, dateOfBirth, gender, contactNumber, email) VALUES
('Cha Hyun-Su', '2000-09-12', 'M', '+82 7-423-6064', 'hyunsoo@sweethome.com'),
('Will Byers', '2004-10-03', 'M', '+1 949-678-7518 ', 'will@strangerthings.com'),
('Yuzuha Usagi', '1995-02-03', 'F', '+81 43-776-6202', 'usagi@borderlands.com');

-- Inserting data into Addresses
INSERT INTO Addresses (streetName, unitNumber, city, state, country, postalCode) VALUES
('Anmak-dong', '72-8', 'Andong-si','Gyeongsangbuk-do', 'South Korea', '37358'),
('1875 Glory Road','','Nashville','Tennessee','United States','37204'),
('Kitabunkyocho','308-1074','Akabira-shi','Hokkaido','Japan','5020912');

-- Inserting data into Customer_Addresses
INSERT INTO Customer_Addresses (customer_id, address_id, dateFrom) VALUES
(1, 1, '2013-01-01'),
(2, 2, '2004-01-01'),
(3, 3, '2020-01-01');

-- Inserting data into Account_Types
INSERT INTO Account_Types (accTypeName) VALUES
('Savings'),
('Checking');

-- Inserting data into Accounts
INSERT INTO Accounts (currBalance, dateOpened, customer_id, account_type_id) VALUES
(1000.00, '2023-01-01', 1, 1),
(500.00, '2023-01-01', 2, 2),
(2000.00, '2023-01-01', 3, 1),
(1500.00, '2024-01-15', 1, 2),
(3000.00, '2024-02-20', 2, 1),
(2500.00, '2024-03-10', 3, 2);

-- Inserting data into Balances
INSERT INTO Balances (balDate, balAmount, account_id) VALUES
('2023-02-01', 1200.00, 1),
('2023-02-01', 550.00, 2),
('2023-02-01', 2200.00, 3),
('2023-03-01', 1300.00, 1),
('2023-03-01', 600.00, 2),
('2023-03-01', 2300.00, 3),
('2024-01-15', 1500.00, 4),
('2024-02-20', 3000.00, 5),
('2024-03-10', 2500.00, 6);

-- Inserting data into Transaction_Types
INSERT INTO Transaction_Types (transactTypeName) VALUES
('Deposit'),
('Withdrawal');

-- Inserting data into Transactions
INSERT INTO Transactions (transactDate, transactAmount, transactDescription, account_id, transaction_type_id) VALUES
('2023-01-02', 200.00, 'Repayment from Eun Yu for Date', 1, 1),
('2023-01-03', 50.00, 'Exchange Money for Overseas Trip', 2, 2),
('2023-01-05', 300.00, 'Weekly Salary Received', 3, 1),
('2024-01-16', 500.00, 'Deposit from Side Hustle', 4, 1),
('2024-01-17', 200.00, 'Purchase New Speakers', 4, 2),
('2024-02-21', 1000.00, 'Weekly Salary Received', 5, 1),
('2024-02-25', 400.00, 'Buy New Watch', 5, 2),
('2024-03-11', 800.00, 'TOTO Winnings', 6, 1),
('2024-03-15', 200.00, 'Family Dinner', 6, 2);