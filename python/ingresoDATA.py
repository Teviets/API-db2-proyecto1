import fake as f
import random as r

# obtener nombre y apellido, correos electronicos, contraseñas, rol ("admin", "user", "owner") con fake 50,000  registros
def get_data():
    data = []
    roles = ["admin", "user", "owner"]
    for _ in range(50000):
        data.append({
            "nombre": f.FAKER.first_name(),
            "apellido": f.FAKER.last_name(),
            "correo": f.FAKER.email(),
            "contraseña": f.FAKER.word(),
            "rol": roles[r.randint(0,2)]#f.FAKER.random_element(elements=("admin", "user", "owner"))
        })
    return data

# obtener nombre (de platillo), precio (de 30 a 200), descripcion (de 10 a 30 palabras), id de restaurante (de 0 a 50,000)
def get_platillos():
    data = []
    for i in range(50000):
        data.append({
            "id": r.randint(0, 50000),
            "nombre": f.FAKER.word()+f.FAKER.word(),
            "precio": r.uniform(30, 200),
            "descripcion": f.FAKER.words(nb=30),
            "id_restaurante": r.randint(0, 50000)
        })
    return data

# obtener nombre (de restaurante) ubicacion (latitud y longitud de guatemal), id (de 0 a 50,000), menu (lista de diccionario con nombre y precio de 4 a 10)
def get_restaurantes():
    data = []
    platillos = get_platillos()
    num_platillos = len(platillos)

    for i in range(50000):
        vals = [platillos[r.randint(0, num_platillos - 1)] for _ in range(r.randint(4, 10))]
        data.append({
            "id": r.randint(0, 50000),
            "nombre": f.FAKER.word() + f.FAKER.word(),
            "ubicacion": {
                "latitud": r.uniform(14.5, 15.5),
                "longitud": r.uniform(90.5, 91.5)
            },
            "menu": [
                {"nombre": vals[y]["nombre"], "precio": vals[y]["precio"]} for y in range(len(vals))
            ]
        })
    return data


# obtener id de restaurante, id de usuario, fecha (de febrero 2024 a febrero 2025), cantidad de personas (de 1 a 20), comentarios de reserva (de 10 a 30 palabras)
def get_reservas():
    data = []
    for i in range(50000):
        data.append({
            "id_restaurante": r.randint(0, 50000),
            "id_usuario": r.randint(0, 50000),
            "fecha": f.FAKER.date(start_date="-0d", end_date="+365d"),
            "cantidad_personas": r.randint(1, 20),
            "comentarios": f.FAKER.words(nb=30)
        })
    return data

# obtener id de restaurante, clienteid, fecha (de febrero 2024 a febrero 2025), puntuacion de 0 a 5, comentarios de calificacion (de 10 a 30 palabras)
def get_calificaciones():
    data = []
    for i in range(50000):
        data.append({
            "id_restaurante": r.randint(0, 50000),
            "clienteid": r.randint(0, 50000),
            "fecha": f.FAKER.date(start_date="-0d", end_date="+365d"),
            "puntuacion": r.randint(0, 5),
            "comentarios": f.FAKER.words(nb=30)
        })
    return data



data = get_data()
platillos = get_platillos()
restaurantes = get_restaurantes()
reservas = get_reservas()
calificaciones = get_calificaciones()

print(data)
print(platillos)
print(restaurantes)
print(reservas)
print(calificaciones)