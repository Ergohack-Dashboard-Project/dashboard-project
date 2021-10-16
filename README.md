# dashboard-project
Balance aggregator and yield visualizations for your balances - connect multiple wallets and see your yields in one single place.

Currently developing outside of docker, because yarn dev reloads quicker that way. 

1. In root, run `docker-compose up --build` to initiate backend
2. Run `docker ps` to get the container ID of the "dashboard-project_server" container, and copy it
3. Run `docker exec -it {CONTAINER ID} bash` to open a bash terminal to that docker container
4. In that terminal, type `alembic upgrade head` to migrate the database. 
5. Navigate to `http://localhost:8000/docs` and test the various endpoints to ensure the backend is up and running

Now, to initiate frontend, you need to have NPM installed in your dev enviroment. 
1. Navigate to `frontend` directory. 
2. Use `npm install` to set up
3. Install yarn if you don't already have it with `npm install -g yarn`
4. Run `yarn dev` to initiate the dev server
5. Browse to `htttp://localhost:3000` to check that the server is up and running. 

You can now change anything in the frontend folder and it will automatically refresh the website for you. 

To make changes to backend, it's a good idea to reset the docker with `ctrl-C` if you're following the docker logs, or `docker-compose stop` in a fresh terminal. Theen run `docker-compose up` to start it again. 
