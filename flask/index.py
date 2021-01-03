from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

# Configure db
db = yaml.load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']

mysql = MySQL(app)

# @app.route('/flask')
# def flask():
#     return "api from flask says hello"

@app.route('/')
def index():
    return "flask homepage"

@app.route('/products')
def allProducts():
    cur = mysql.connection.cursor()
    result = cur.execute("SELECT * from Products")
    data = jsonify(cur.fetchall())
    print(data)
    cur.close()
    return data

@app.route('/products/new/<product>', methods=['POST'])
def newProduct(product):
    cur = mysql.connection.cursor()
    cur.execute(f"INSERT INTO Products(product_name) VALUES('{product}')")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
    print(data)
    return data

@app.route('/locations')
def allLocations():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * from Locations")
    data = jsonify(cur.fetchall())
    print(data)
    cur.close()
    return data

@app.route('/locations/new/<location>', methods=['POST'])
def newLocation(location):
    cur = mysql.connection.cursor()
    cur.execute(f"INSERT INTO Locations(location_name) VALUES('{location}')")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
    print(data)
    return data

@app.route('/productmovements')
def location():
    print(request)
    location = request.args.get('location')
    print(location)
    cur = mysql.connection.cursor()
    cur.execute(f"SELECT location_id FROM Locations WHERE location_name='{location}'")
    loc_id = cur.fetchone()
    print(loc_id[0])
    cur.execute(f"SELECT pm.prod_id,(SELECT product_name FROM Products WHERE pm.prod_id=product_id) AS Name, pm.quantity FROM ProductMovement AS pm WHERE pm.to_loc={loc_id[0]}")
    data = jsonify(cur.fetchall())
    cur.close()
    return data

@app.route('/productmovement')
def productMovement():
    cur = mysql.connection.cursor()
    cur.execute("SELECT pm.movement_id,(SELECT product_name FROM Products where product_id=pm.prod_id) AS name, pm.quantity FROM ProductMovement AS pm")
    data = jsonify(cur.fetchall())
    print(data)
    cur.close()
    return data

if __name__ == '__main__':
    app.run(debug=True)