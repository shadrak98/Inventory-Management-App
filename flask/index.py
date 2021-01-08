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
    loc = request.args.get('location')
    if loc == None:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * from Locations")
        data = jsonify(cur.fetchall())
        cur.close()
        return data
    else:
        cur = mysql.connection.cursor()
        cur.execute(f"SELECT * from Locations WHERE location_name<>'{loc}'")
        data = jsonify(cur.fetchall())
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
    cur.execute(f"SELECT pm.prod_id,(SELECT product_name FROM Products WHERE pm.prod_id=product_id) AS Name, pm.quantity FROM ProductMovement AS pm WHERE pm.to_loc=(select location_id from Locations where location_name='{location}')")
    data = jsonify(cur.fetchall())
    cur.close()
    return data

@app.route('/productmovement', methods=['GET','POST'])
def productMovement():
    print(request.args.get('token'))
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("select pm.prod_id, greatest(0,((select sum(pmi.quantity) as sum from ProductMovement as pmi where pmi.prod_id=pm.prod_id)-(select sum(pmo.quantity) as sum from ProductMovement as pmo where pmo.from_loc=2 and pmo.prod_id=pm.prod_id))) as total from ProductMovement as pm group by pm.prod_id")
        data = jsonify(cur.fetchall())
        print(data)
        cur.close()
        return data
    elif request.method == 'POST':
        product = request.args.get('product')
        from_loc = request.args.get('from')
        to_loc = request.args.get('to')
        quantity = request.args.get('quantity')
        cur = mysql.connection.cursor()
        cur.execute(f"INSERT INTO ProductMovement(datetime,from_loc,to_loc,prod_id,quantity) VALUES(now(),(select location_id from Locations where location_name='{from_loc}'),(select location_id from Locations where location_name='{to_loc}'),(select product_id from Products where product_name='{product}'),{quantity})")
        data = jsonify(cur.fetchone())
        cur.close()
        mysql.connection.commit()
        print(data)
        return data

if __name__ == '__main__':
    app.run(debug=True)