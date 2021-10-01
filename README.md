# eso-phresh

Back-end startup
1. run `openssl rand -hex 32` and use that as the secret key in the .env.template file, then rename that file to .env
2. in root dir, run `docker-compose up --build`
3. run `docker ps` to get the docker container ID for the server
4. `docker exec -it {container ID} bash` followed by `alembic upgrade head`
5. You should now be able to test endpoints at localhost:8000/docs

Front-end startup
1. in frontend folder run `npm install`
2. then run `yarn start`
3. You should now be able to view the frontend at localhost:3000
