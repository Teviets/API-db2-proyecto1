import fake as f
import random as r

from pymongo import MongoClient

dbURL = "mongodb+srv://devsebasest37:040902@proyectodb2.cqgnmx4.mongodb.net/"

client = MongoClient(dbURL)

db = client["TasteTrail"]


platesName = [
    "Pescado a la Veracruzana",
    "Tacos de Carnitas",
    "Spaghetti Carbonara",
    "Pollo al Curry",
    "Paella Valenciana",
    "Asado de Tira",
    "Crepas de Espinacas",
    "Tacos de Camarón",
    "Ensalada César",
    "Pasta Alfredo",
    "Tacos de Pescado",
    "Lomo Saltado",
    "Sushi Variado",
    "Pasta Bolognesa",
    "Tacos de Res",
    "Ceviche Mixto",
    "Pasta Marinera",
    "Tacos de Pollo",
    "Pescado a la Plancha",
    "Tacos de Cochinita",
    "Pasta Primavera",
    "Tacos de Chorizo",
    "Pescado Empanizado",
    "Tacos de Asada",
    "Pasta con Pesto",
    "Tacos de Lengua",
    "Pescado al Mojo de Ajo",
    "Tacos de Pato",
    "Pasta con Salsa de Tomate",
    "Tacos de Chicharrón",
    "Pescado al Limón"
]


imgs = [
    "https://www.guatemala.com/fotos/2020/11/Diaca-885x500.jpg",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/e7/a0/e1/entrada-principal.jpg?w=600&h=400&s=1",
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/b1/5b/cc/winebar-de-sublime-foto.jpg?w=1200&h=-1&s=1",
    "https://cdn.forbes.com.mx/2017/09/Restaurantes-mexicanos-P.jpg",
    "https://www.guatemala.com/fotos/2019/02/Los-Tres-Tiempos-Ciudad-de-Guatemala-885x500.jpg"
]

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
    for _ in range(25000):

        usuarios.append({
            "nombre": f.FAKER.first_name(),
            "apellido": f.FAKER.last_name(),
            "correo": f.FAKER.email(),
            "contraseña": f.FAKER.word(),
            "rol": rol,
            "restaurantes": [restaurantes[r.randint(0, 4999)] for _ in range(r.randint(1, 5))] if (rol == 0 or rol == 1)  else []
        })

# obtener nombre (de restaurante) ubicacion (latitud y longitud de guatemal), id (de 0 a 50,000), menu (lista de diccionario con nombre y precio de 4 a 10)
# 5 k registros
def get_restaurantes():
    num_platillos = len(platillos)

    # obtener platillos
    platillosGet = list(db["Plate"].find())  # Convertir el cursor a lista

    for i in range(5000):
        vals = [platillosGet[r.randint(0, len(platillosGet)-1)] for _ in range(r.randint(4, 12))]

        restaurantes.append({
            "nombre": platesName[r.randint(0, len(platesName)-1)],
            "img": imgs[r.randint(0, len(imgs)-1)],
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



# obtener nombre (de platillo), precio (de 30 a 200), descripcion (de 10 a 30 palabras), id de restaurante (de 0 a 50,000)
# 8 k registros
def get_platillos():
    for _ in range(8000):

        platillos.append({
            "nombre": f.FAKER.word()+f.FAKER.word(),
            "precio": r.uniform(30, 200),
            "descripcion": f.FAKER.sentence(nb_words=30),
            "id_restaurante": r.randint(0, 50000)
        })

# obtener id de restaurante, id de usuario, fecha (de febrero 2024 a febrero 2025), cantidad de personas (de 1 a 20), comentarios de reserva (de 10 a 30 palabras)
# 10 k registros
def get_reservas():

    # get _id de restaurante y usuario
    restaurantes = db["Restaurant"].find()
    users = db["User"].find()

    
    for i in range(10000):
        print(i)
        
        date = str(f.FAKER.date_time(start_date="-0d", end_date="+365d"))

        reservas.append({
            "id_restaurante": restaurantes[r.randint(0, 4999)]["_id"],
            "id_usuario": users[r.randint(0, 24999)]["_id"],
            "fecha": date,
            "cantidad_personas": r.randint(1, 20),
            "comentarios": f.FAKER.sentence(nb_words=30)
        })

# obtener id de restaurante, clienteid, fecha (de febrero 2024 a febrero 2025), puntuacion de 0 a 5, comentarios de calificacion (de 10 a 30 palabras)
# 2 k registros
def get_calificaciones():
    restaurantes = db["Restaurant"].find()
    users = db["User"].find()

    for i in range(2000):
        calificaciones.append({
            "id_restaurante": restaurantes[r.randint(0, 4999)]["_id"],
            "clienteid": users[r.randint(0, 24999)]["_id"],
            "fecha": f.FAKER.date(start_date="-0d", end_date="+365d"),
            "puntuacion": r.uniform(0, 5),
            "comentarios": f.FAKER.sentence(nb_words=30)
        })


#get_platillos()
#db["Plate"].insert_many(platillos)
#print("Platillos insertados")

#get_restaurantes()
#db["Restaurant"].insert_many(restaurantes)
#print("Restaurantes insertados")

#get_users()
#db["User"].insert_many(usuarios)
#print("Users insertados")

get_reservas()
db["Reservation"].insert_many(reservas)
print("Reservas insertadas")

#get_calificaciones()
#db["Ratings"].insert_many(calificaciones)
#print("Rating insertados")


#print(usuarios)
#print(platillos)
#print(restaurantes)
#print(reservas)
#print(calificaciones)