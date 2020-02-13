Este proyecto de dos parte la api creada con express y el front creada con react

## Requisitos 
Docker instalado 

## Para correr el proyecto front en forma local:
- npm install
- npm run start


## Para correr el proyecto back en forma local:
- npm install
- npm run docker:network
- npm run docker:redis
- npm run docker:build
- npm run docker:dev


## Para correr con docker-compose:
- docker-compose -f docker-compose.yml pull
- docker-compose -f docker-compose.yml up -d


## Enpoint creado 
- method : GET
- path: /api/search?lat=${value}&lng=${value}

## traefik 1.7 
- back ec2-3-16-54-149.us-east-2.compute.amazonaws.com/api/search to  ec2-3-16-54-149.us-east-2.compute.amazonaws.com:3000/api/search"
- front ec2-3-16-54-149.us-east-2.compute.amazonaws.com to  ec2-3-16-54-149.us-east-2.compute.amazonaws.com:81
