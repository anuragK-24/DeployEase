# it'll be used to build the docker image for the build server
FROM ubuntu:focal 
# Above will be used to pull the ubuntu base image from docker hub

RUN apt-get update 
# Above will update the package list of the ubuntu image
RUN apt-get install -y curl
# Above will install curl package in the ubuntu image
# curl will be used to download the nodejs package - for API call to the nodejs server

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
# Above will download the nodejs package from the nodejs server

RUN apt-get upgrade -y
# Above will upgrade the packages in the ubuntu image


RUN apt-get install -y nodejs
# Above will install the nodejs package in the ubuntu image

RUN apt-get install git -y 
# Above will install the git package in the ubuntu image
# git will be used to clone the code from the git repository

WORKDIR /home/app
# Above will set the working directory to /home/app

COPY main.sh main.sh
# Above will copy the main.sh file from the build-server directory to the /home/app directory in the ubuntu image

COPY script.js script.js
# Above will copy the script.js file from the build-server directory to the /home/app directory in the ubuntu image

COPY package*.json .
# Above will copy the package.json and package-lock.json files from the build-server directory to the /home/app directory in the ubuntu image

RUN npm install 
<<<<<<< HEAD
RUN chmod +x main.sh
# Above will install the nodejs packages and set the main.sh file as executable
RUN chmod +x script.js
=======
RUN chmod +x maim. sh
# Above will install the nodejs packages and set the main.sh file as executable
RUN chmod +x script. js
>>>>>>> df4ba13 (Added the Reverse proxy and api-server)
# Above will set the script.js file as executable

ENTRYPOINT [ "/home/app/main.sh" ]
# Above will set the entrypoint of the docker image to /home/app/main.sh
# main.sh will be used to clone the code from the git repository and run the build and test commands
