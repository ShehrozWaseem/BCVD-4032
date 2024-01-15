docker build -t node-app .
docker run -p 3000:3000 -d node-app

docker cp node-app:/usr/src/app /path/on/host

# intro 
- for theory refer to notion and google docs
- when u run docker run it involves 3 cmd on the bg, also the attach cmd tells you about output of the cmd means it print the logs right away so you dont have to `docker log id` explicitly , `docker run <img-name> = docker container create <img> + docker container start <img> + docker container attach <img>`
- to run a container from image u need Dockerfile
- Dockerfile is a file with layers of images as each statement is a image in the docker file
- `docker build -t our-first-img .` ---> `-t` means the target is `our-first-img` so the image will be created with this user defined name, . -> is the path to app (if your dockerfile has other name like `--file app.Dockerfile` then u have to define before path)
- after this cmd the images are build and now it means we are ready to run a container from these image
- `docker run -p 3000:3000 -d <first-img>` we need to define the port in order HOST_PORT:DOCKER_FILE_PORT 
- use `-d` to run in detach mode so u can have terminal control back
- `docker inspect <first-img-id>` you can see the port settings and container ip from here (Q: How can i access the app using docker ip and its defined port)
- `docker exec -it id bash` to perform actions with in the container

- `docker kill id` to stop the container immediately, `docker stop id` -> it sends the control to cont's main process and will kill it by taking its time, `docker stop -t 1 id` -> here it will say kill the process immediately after 1 sec if its not killed till yet
- `docker rm -f` -> will remove the img completely and with `f` it will also kill the process
- `dokcer rmi id` -> to remove image


# deploying jenkins
- first pull jenkins application by providing image ref
- now run the container in detaach mode 
- but first inspect the jenking image docker inspect <img_name>
- here we view the port 
- now we'll do the cmd `docker run -d -p 80:8080 <img-name>` - here we define the 80 port of system and map it with 8080 port from docker container so the app will run on 80 
- now when we open the app on browser it will assk for psw so now we'll go into container env itd=>interactive mode `docker exec -it cd /bin/bash` to get the psw (we can get the exact path from the web page)

# docker network
- docker network inspect <img-name>
- host,bridge,none
- for none container the docker container wont be accessible outside network (dummy machine)
- bridge network subnet along with 16 subnet 
- subnets can be customised acc...
- `docker network ls` will list down the avl network
- this is a custom network `docker network create --driver=bridge --subnet=182.1.0.1/16 isolatedNetwrok`  
- now we have two network with bridge drive when we run the `ls` cmd - and now these 2 bridge network can communicate 
- lets demonstrate the working:
- RUN 2 CONT: `docker run -itd centos` now inspect the container: and there you'll see in Networks it will assign the bridge as def network
- RUN another container which will use a custom defined network `docker run -itd --name=test1 --net=customNetwork` now when u'll inspect this network u'll see the defined subnet the one you defined against customNetwork (ln 21)
- `docker netwrok connect customNetwork  customNetwork2`
- `docker exec -it 85 /bin/bash` 
- `ping <img-name>`
- in the above three cmds we connected 2 diff container (centos based imgs on same network) and then we go into cont id starting with 85 and then there we ping the other container with <img-name>/<ip-add-for-other-container>

# docker volume
- providing persistent storage to container
- img is the readable part and the container is writeable part
- what if u write to container and stop in this case the data will persist but if u remove it then there it will loose the data 
- so to persist u need volume i.e storage that is outside container where u keep the data for the container and u can allow which container to use what volume 
- container keeps the pointer to volume with help of docker engine 
- dcoker container engine has a space where it store volume
- `cd /var/lib/docker` theres a folder here called `volumes` and u can ls here and see the locations
- `docker volume create data_volume` now lets use this colume to run a new container 
- `docker run -itd -v data_volume:/www ubuntu` now when u do `docker ps` u'll see a volume running 
- go to the volume container it has id 82 `docker exec -it 82 /bin/bash` now do ls here now create a file here `echo 'hello world' > test.txt`
- now go to data_volume directory and u will have their test.txt file (the file is nested within extra default directories)
- now stop and remove the container and create a new container pointing to the volume just for the sake to see whether it will work or not
- now create another container `docker run -itd -v data_volume:/new_folder ubuntu` ubuntu is the image name 

- BINDING MOUNT:
- go to root and create a folder where do `docker run -itd -v /home/username/<bind_mount_created_folder>:/persist ubuntu`
- `docker exec -it b9 /bin/bash` b9 is the id of the above running cont 
- now go to persist folder after runing exec and create a similar file by exho 
- it'll create the file their in the docker exec wala step in persist folder and it will also create the file in system directory which u create in `ln46`

# DOCKER COMPOSE
- to run multiple containers (as there are dependencies between containers so we need to run them all at once)

# FLOW
- narrated the flow
- EXPLAING DOCKER COMPOSE 
- so we want to start services in order: envr,server,fe
# LAB:

### GANACHE DOCKER FILE INFO:
- for ganache they've define the image and in build they ve define the Dockerfile with the port defined in the container
- gaanche docker file so using node js as gaanch e req node js
- then create a workdir where docker will do the work in the docker envr
- then npm as it just ganache-cli
- and start the ganache network with CMD

### DOCKER ETH FILE INFO:
- there is no docker file define in the compose main file for dapp (Ethereum image) so it will pick the default DeockerFile
- run `docker compose up --build`
- in yml u can also define the volume and networks 

