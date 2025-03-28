import sqlite3
import random
import pandas as pd
from datetime import datetime, timedelta

# # Create SQLite database
# db_name = "finance_data.db"
# conn = sqlite3.connect(db_name)
# cursor = conn.cursor()

# # Create tbl_asset_returns
# cursor.execute("""
# CREATE TABLE IF NOT EXISTS tbl_asset_returns (
#     asset_id INTEGER PRIMARY KEY,
#     asset_name TEXT NOT NULL,
#     as_of_date DATE NOT NULL,
#     asset_return FLOAT NOT NULL
# );
# """)

# # Create tbl_asset_allocations
# cursor.execute("""
# CREATE TABLE IF NOT EXISTS tbl_asset_allocations (
#     allocation_id INTEGER PRIMARY KEY,
#     portfolio_name TEXT NOT NULL,
#     asset_name TEXT NOT NULL,
#     allocation_percentage FLOAT NOT NULL,
#     allocation_date DATE NOT NULL
# );
# """)

# # Asset names and categories
# assets = [
#     {"name": "Apple Inc.", "type": "Stock"},
#     {"name": "Microsoft Corp.", "type": "Stock"},
#     {"name": "Tesla Inc.", "type": "Stock"},
#     {"name": "US Treasury Bond", "type": "Bond"},
#     {"name": "Corporate Bond AAA", "type": "Bond"},
#     {"name": "Gold ETF", "type": "Commodity"},
#     {"name": "Real Estate Fund", "type": "Real Estate"},
#     {"name": "Global Equity Fund", "type": "Mutual Fund"}
# ]

# # Portfolios
# portfolios = ["Growth Portfolio", "Income Portfolio", "Balanced Portfolio"]

# # Generate fake data for tbl_asset_returns
# returns_data = []
# start_date = datetime(2023, 1, 1)
# for asset in assets:
#     for i in range(100):  # Generate 100 daily returns per asset
#         return_date = start_date + timedelta(days=i)
#         return_value = round(random.uniform(-0.03, 0.03), 4)  # Random returns between -3% and 3%
#         returns_data.append((asset["name"], return_date.strftime("%Y-%m-%d"), return_value))

# cursor.executemany("""
# INSERT INTO tbl_asset_returns (asset_name, as_of_date, asset_return)
# VALUES (?, ?, ?);
# """, returns_data)

# # Generate fake data for tbl_asset_allocations
# allocations_data = []
# allocation_date = "2023-01-01"
# for portfolio in portfolios:
#     for asset in assets:
#         allocation_percentage = round(random.uniform(5, 30), 2)  # Random allocation between 5% and 30%
#         allocations_data.append((portfolio, asset["name"], allocation_percentage, allocation_date))

# cursor.executemany("""
# INSERT INTO tbl_asset_allocations (portfolio_name, asset_name, allocation_percentage, allocation_date)
# VALUES (?, ?, ?, ?);
# """, allocations_data)

# # Commit changes and close connection
# conn.commit()


# # Load the data for validation
# df_returns = pd.read_sql_query("SELECT * FROM tbl_asset_returns", conn)
# df_allocations = pd.read_sql_query("SELECT * FROM tbl_asset_allocations", conn)

# print("tbl_asset_returns:")
# print(df_returns.head())

# print("\ntbl_asset_allocations:")
# print(df_allocations.head())

# conn.close()

import sqlite3
import random
import datetime
import csv

# Connect to SQLite database (or create one if it doesn't exist)
conn = sqlite3.connect('finance_data.db')
cursor = conn.cursor()

# Create tables
cursor.execute('''CREATE TABLE IF NOT EXISTS position_level_returns (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    as_of_date DATE NOT NULL,
                    security_name TEXT NOT NULL,
                    quantity INTEGER NOT NULL,
                    price REAL NOT NULL,
                    total_value REAL NOT NULL,
                    trade_type TEXT CHECK(trade_type IN ('buy', 'sell')) NOT NULL,
                    trade_time TIMESTAMP NOT NULL,
                    fund_level TEXT NOT NULL
                )''')

cursor.execute('''CREATE TABLE IF NOT EXISTS benchmark_returns (
                    benchmark_id INTEGER PRIMARY KEY AUTOINCREMENT,
                    benchmark_name TEXT NOT NULL,
                    as_of_date DATE NOT NULL,
                    benchmark_value REAL NOT NULL
                )''')

# Function to generate random dates
def generate_random_date(start_date, end_date):
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    random_date = start_date + datetime.timedelta(days=random_days)
    return random_date

# Insert benchmark data
benchmark_data = [
    ('S&P 500', datetime.date(2024, 9, 1), 4300),
    ('S&P 500', datetime.date(2024, 9, 2), 4350),
    ('S&P 500', datetime.date(2024, 9, 3), 4200),
    ('S&P 500', datetime.date(2024, 9, 4), 4400),
    ('S&P 500', datetime.date(2024, 9, 5), 4450),
]

cursor.executemany('INSERT INTO benchmark_returns (benchmark_name, as_of_date, benchmark_value) VALUES (?, ?, ?)', benchmark_data)

# Function to insert asset return data
def insert_asset_data():
    asset_names = ['Chanson International Holding', 'BAIYU Holdings, Inc.']
    fund_levels = ['Growth Portfolio', 'Income Portfolio', 'Balanced Portfolio']
    
    for i in range(200):
        as_of_date = generate_random_date(datetime.date(2024, 9, 1), datetime.date(2024, 10, 31))
        security_name = random.choice(asset_names)
        quantity = random.randint(100, 1000)
        price = round(random.uniform(50, 500), 2)
        total_value = quantity * price
        trade_type = random.choice(['buy', 'sell'])
        trade_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        fund_level = random.choice(fund_levels)
        
        cursor.execute('''INSERT INTO position_level_returns (as_of_date, security_name, quantity, price, total_value, 
                          trade_type, trade_time, fund_level) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
                       (as_of_date, security_name, quantity, price, total_value, trade_type, trade_time, fund_level))

# Insert 200 entries for asset returns
insert_asset_data()

# Commit and close the connection
conn.commit()
conn.close()

print("Data has been inserted successfully.")