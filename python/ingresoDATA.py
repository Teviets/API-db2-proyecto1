import fake as f
import random as r

from pymongo import MongoClient

dbURL = "mongodb+srv://devsebasest37:040902@proyectodb2.cqgnmx4.mongodb.net/"

client = MongoClient(dbURL)

usuarios = []
restaurantes = []
platillos = []
reservas = []
calificaciones = []

# obtener nombre y apellido, correos electronicos, contraseñas, rol ("admin", "user", "owner") con fake 50,000  registros
# 25 k registros
def get_users():
    
    # agregar restaurantes solo si son owners
    roles = ["admin", "user", "owner"]
    rol = r.randint(0,2)
    ids = []
    for _ in range(25000):

        while True:
            id = r.randint(0, 25000)
            if id not in ids:
                ids.append(id)
                break

        usuarios.append({
            "id": id,
            "nombre": f.FAKER.first_name(),
            "apellido": f.FAKER.last_name(),
            "correo": f.FAKER.email(),
            "contraseña": f.FAKER.word(),
            "rol": rol,
            "restaurantes": [restaurantes[r.randint(0, 4999)] for _ in range(r.randint(1, 5))] if (rol == 0 or rol == 1)  else []
        })

# obtener nombre (de platillo), precio (de 30 a 200), descripcion (de 10 a 30 palabras), id de restaurante (de 0 a 50,000)
# 8 k registros
def get_platillos():
    ids = []
    for i in range(8000):

        while True:
            id = r.randint(0, 24999)
            if id not in ids:
                ids.append(id)
                break

        platillos.append({
            "id": id,
            "nombre": f.FAKER.word()+f.FAKER.word(),
            "precio": r.uniform(30, 200),
            "descripcion": f.FAKER.sentence(nb_words=30),
            "id_restaurante": r.randint(0, 50000)
        })

# obtener nombre (de restaurante) ubicacion (latitud y longitud de guatemal), id (de 0 a 50,000), menu (lista de diccionario con nombre y precio de 4 a 10)
# 5 k registros
def get_restaurantes():
    num_platillos = len(platillos)
    ids = []

    for i in range(5000):
        vals = [platillos[r.randint(0, num_platillos - 1)] for _ in range(r.randint(4, 12))]

        while True:
            id = r.randint(0, 24999)
            if id not in ids:
                ids.append(id)
                break

        restaurantes.append({
            "id": id,
            "nombre": f.FAKER.word() + f.FAKER.word(),
            "img": f.FAKER.image_url(),
            "descripcion": f.FAKER.sentence(nb_words=30),
            "rating": r.uniform(0.5, 5),
            "ubicacion": {
                "latitud": r.uniform(14.5, 15.5),
                "longitud": r.uniform(90.5, 91.5)
            },
            "menu": [
                {"nombre": vals[y]["nombre"], "precio": vals[y]["precio"]} for y in range(len(vals))
            ]
        })


# obtener id de restaurante, id de usuario, fecha (de febrero 2024 a febrero 2025), cantidad de personas (de 1 a 20), comentarios de reserva (de 10 a 30 palabras)
# 10 k registros
def get_reservas():
    ids = []
    for i in range(10000):

        date = str(f.FAKER.date_time(start_date="-0d", end_date="+365d"))
        while True:
            id = r.randint(0, 24999)
            if id not in ids:
                ids.append(id)
                break

        reservas.append({
            "id": id,
            "id_restaurante": r.randint(0, 4999),
            "id_usuario": r.randint(0, 24999),
            "fecha": date,
            "cantidad_personas": r.randint(1, 20),
            "comentarios": f.FAKER.sentence(nb_words=30)
        })

# obtener id de restaurante, clienteid, fecha (de febrero 2024 a febrero 2025), puntuacion de 0 a 5, comentarios de calificacion (de 10 a 30 palabras)
# 2 k registros
def get_calificaciones():
    ids = []
    for i in range(2000):
        while True:
            id = r.randint(0, 2999)
            if id not in ids:
                ids.append(id)
                break

        calificaciones.append({
            "id": id,
            "id_restaurante": r.randint(0, 4999),
            "clienteid": r.randint(0, 24999),
            "fecha": str(f.FAKER.date(start_date="-0d", end_date="+365d")),
            "puntuacion": r.uniform(0, 5),
            "comentarios": f.FAKER.sentence(nb_words=30)
        })


get_platillos()
get_restaurantes()
get_users()
get_reservas()
get_calificaciones()


# insertar datos en la base de datos
db = client["TasteTrail"]

db["User"].insert_many(usuarios)
db["Plate"].insert_many(platillos)
db["Restaurant"].insert_many(restaurantes)
db["Reservation"].insert_many(reservas)
db["Ratings"].insert_many(calificaciones)

print(usuarios)
#print(platillos)
#print(restaurantes)
#print(reservas)
#print(calificaciones)