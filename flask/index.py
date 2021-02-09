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

@app.route('/products/<id>/delete', methods=['DELETE'])
def deleteProduct(id):
    cur = mysql.connection.cursor()
    cur.execute(f"DELETE FROM Products WHERE product_id={id}")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
    return data

@app.route('/product/update/<id>/<value>', methods=['POST'])
def updateProduct(id,value):
    cur = mysql.connection.cursor()
    cur.execute(f"UPDATE Products SET product_name='{value}' WHERE product_id={id}")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
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

@app.route('/location/<id>/delete', methods=['DELETE'])
def deleteLocation(id):
    cur = mysql.connection.cursor()
    cur.execute(f"DELETE FROM Locations WHERE location_id={id}")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
    return data

@app.route('/location/update/<id>/<value>', methods=['POST'])
def updateLocation(id,value):
    cur = mysql.connection.cursor()
    cur.execute(f"UPDATE Locations SET location_name='{value}' WHERE location_id={id}")
    data = jsonify(cur.fetchone())
    cur.close()
    mysql.connection.commit()
    return data

@app.route('/productmovements_locationwise')
def location():
    print(request)
    location = request.args.get('location')
    print(location)
    if location != "":
        cur = mysql.connection.cursor()
        cur.execute(f"select location_id from Locations where location_name='{location}'")
        loc = cur.fetchone()
        print(loc)
        print(loc[0])
        cur.execute(f"select I.prod_id, (select product_name from Products where product_id=I.prod_id) as name, greatest((I.sum - ifnull(O.sum,0)),0) as sum from (select prod_id,sum(quantity) as sum from ProductMovement where to_loc={loc[0]} group by prod_id) as I LEFT OUTER JOIN (select prod_id,sum(quantity) as sum from ProductMovement where from_loc={loc[0]} group by prod_id) as O on I.prod_id=O.prod_id, ProductMovement where ProductMovement.prod_id=I.prod_id group by prod_id")
        data = jsonify(cur.fetchall())
        print(data)
        cur.close()
        return data

@app.route('/productmovement', methods=['GET','POST'])
def productMovement():
    # print(request.args.get('token'))
    if request.method == 'GET':
        cur = mysql.connection.cursor()
        cur.execute("select pm.movement_id, (select product_name from Products where product_id=pm.prod_id) as name, pm.quantity from ProductMovement as pm")
        data = jsonify(cur.fetchall())
        print(data)
        cur.close()
        return data
    elif request.method == 'POST':
        product = request.args.get('product')
        from_loc = request.args.get('from')
        to_loc = request.args.get('to')
        quantity = request.args.get('quantity')
        print(from_loc + " " + to_loc)
        cur = mysql.connection.cursor()
        cur.execute(f"INSERT INTO ProductMovement(datetime,from_loc,to_loc,prod_id,quantity) VALUES(now(),(select location_id from Locations where location_name='{from_loc}'),(select location_id from Locations where location_name='{to_loc}'),(select product_id from Products where product_name='{product}'),{quantity})")
        data = jsonify(cur.fetchone())
        cur.close()
        mysql.connection.commit()
        print(data)
        return data

if __name__ == '__main__':
    app.run(debug=True)