from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash


app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "tg-suplementos-secret-key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///tg_suplementos.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================
# MODELS
# =========================

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

    products = db.relationship("Product", backref="category", lazy=True)


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)


# =========================
# HELPERS
# =========================

def generate_token(user):
    payload = {
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(hours=8)
    }

    return jwt.encode(payload, app.config["SECRET_KEY"], algorithm="HS256")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({"message": "Token não enviado."}), 401

        try:
            token = auth_header.split(" ")[1]
            data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = User.query.get(data["user_id"])

            if not current_user:
                return jsonify({"message": "Usuário inválido."}), 401

        except Exception:
            return jsonify({"message": "Token inválido ou expirado."}), 401

        return f(current_user, *args, **kwargs)

    return decorated


def product_to_dict(product):
    return {
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "stock": product.stock,
        "imageUrl": product.image_url,
        "categoryId": product.category_id,
        "category": {
            "id": product.category.id,
            "name": product.category.name
        } if product.category else None
    }


def category_to_dict(category):
    return {
        "id": category.id,
        "name": category.name
    }


# =========================
# AUTH ROUTES
# =========================

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Nome, e-mail e senha são obrigatórios."}), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"message": "E-mail já cadastrado."}), 409

    user = User(
        name=name,
        email=email,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    token = generate_token(user)

    return jsonify({
        "message": "Usuário cadastrado com sucesso.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "E-mail e senha são obrigatórios."}), 400

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Credenciais inválidas."}), 401

    token = generate_token(user)

    return jsonify({
        "message": "Login realizado com sucesso.",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }), 200


# =========================
# CATEGORY ROUTES
# =========================

@app.route("/categories", methods=["GET"])
@token_required
def get_categories(current_user):
    categories = Category.query.all()
    return jsonify([category_to_dict(category) for category in categories]), 200


# =========================
# PRODUCT ROUTES
# =========================

@app.route("/products", methods=["GET"])
@token_required
def get_products(current_user):
    products = Product.query.order_by(Product.id.desc()).all()
    return jsonify([product_to_dict(product) for product in products]), 200


@app.route("/products/<int:product_id>", methods=["GET"])
@token_required
def get_product(current_user, product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Produto não encontrado."}), 404

    return jsonify(product_to_dict(product)), 200


@app.route("/products", methods=["POST"])
@token_required
def create_product(current_user):
    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    stock = data.get("stock")
    image_url = data.get("imageUrl")
    category_id = data.get("categoryId")

    if not name or not description or price is None or stock is None or not category_id:
        return jsonify({"message": "Preencha todos os campos obrigatórios."}), 400

    category = Category.query.get(category_id)

    if not category:
        return jsonify({"message": "Categoria inválida."}), 400

    product = Product(
        name=name,
        description=description,
        price=float(price),
        stock=int(stock),
        image_url=image_url or "https://via.placeholder.com/300",
        category_id=int(category_id)
    )

    db.session.add(product)
    db.session.commit()

    return jsonify({
        "message": "Produto criado com sucesso.",
        "product": product_to_dict(product)
    }), 201


@app.route("/products/<int:product_id>", methods=["PUT"])
@token_required
def update_product(current_user, product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Produto não encontrado."}), 404

    data = request.get_json()

    name = data.get("name")
    description = data.get("description")
    price = data.get("price")
    stock = data.get("stock")
    image_url = data.get("imageUrl")
    category_id = data.get("categoryId")

    if not name or not description or price is None or stock is None or not category_id:
        return jsonify({"message": "Preencha todos os campos obrigatórios."}), 400

    category = Category.query.get(category_id)

    if not category:
        return jsonify({"message": "Categoria inválida."}), 400

    product.name = name
    product.description = description
    product.price = float(price)
    product.stock = int(stock)
    product.image_url = image_url or "https://via.placeholder.com/300"
    product.category_id = int(category_id)

    db.session.commit()

    return jsonify({
        "message": "Produto atualizado com sucesso.",
        "product": product_to_dict(product)
    }), 200


@app.route("/products/<int:product_id>", methods=["DELETE"])
@token_required
def delete_product(current_user, product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Produto não encontrado."}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Produto excluído com sucesso."}), 200


# =========================
# DATABASE SEED
# =========================

def seed_database():
    if Category.query.count() == 0:
        categories = [
            Category(name="Proteínas"),
            Category(name="Creatinas"),
            Category(name="Pré-treinos"),
            Category(name="Vitaminas"),
        ]

        db.session.add_all(categories)
        db.session.commit()

    if Product.query.count() == 0:
        protein = Category.query.filter_by(name="Proteínas").first()
        creatine = Category.query.filter_by(name="Creatinas").first()
        pre_workout = Category.query.filter_by(name="Pré-treinos").first()

        products = [
            Product(
                name="Whey Protein",
                description="Suplemento proteico para auxiliar no ganho de massa muscular.",
                price=129.90,
                stock=15,
                image_url="https://via.placeholder.com/300",
                category_id=protein.id
            ),
            Product(
                name="Creatina Monohidratada",
                description="Auxilia no aumento de força, resistência e desempenho físico.",
                price=89.90,
                stock=20,
                image_url="https://via.placeholder.com/300",
                category_id=creatine.id
            ),
            Product(
                name="Pré-Treino Extreme",
                description="Energia, foco e disposição para treinos intensos.",
                price=99.90,
                stock=10,
                image_url="https://via.placeholder.com/300",
                category_id=pre_workout.id
            ),
        ]

        db.session.add_all(products)
        db.session.commit()


# =========================
# MAIN
# =========================

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "API TG Suplementos funcionando!",
        "routes": [
            "POST /signup",
            "POST /login",
            "GET /categories",
            "GET /products",
            "POST /products",
            "PUT /products/<id>",
            "DELETE /products/<id>"
        ]
    })


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_database()

    app.run(host="0.0.0.0", port=5000, debug=True)
    