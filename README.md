©2024 - David Ramirez

# Iniciar en Desarrollo

Para poder iniciar el proyecto en modo desarrollo

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose -f docker-compose-dev.yaml up
```

6. Levantar:

```
yarn start:dev
```

## Ejecutar SEED

Para poder pobar con data inicial debe realizar una petición get a /api/seed

```
http://localhost:4000/api/seed
```

Una vez hecho esto tendrá un usuario administrador y data inicial

```
usuario: dramirez
password: prueba2024
```

## Levantar Front

1. Ir a la carpeta frontend
2. `yarn install`
3. `yarn start`

Ejecutar en

```
http://localhost:3000/api/seed
```
