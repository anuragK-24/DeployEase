#!/bin/bash

<<<<<<< HEAD
export GIT_REPOSITORY_URL = "$GIT_REPOSITORY_URL"
=======
export GIT_REPOSITORY_URL="$GIT_REPOSITORY_URL"
>>>>>>> df4ba13 (Added the Reverse proxy and api-server)
# It'll export the git repository url to the environment variable

git clone $GIT_REPOSITORY_URL /home/app/output
# Above code will clone the repository to the output folder                                 
<<<<<<< HEAD

exec node script.js 
# It'll execute the script.js file

=======

exec node script.js 
# It'll execute the script.js file
>>>>>>> df4ba13 (Added the Reverse proxy and api-server)
