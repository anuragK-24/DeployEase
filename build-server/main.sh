#!/bin/bash

export GIT_REPOSITORY_URL="$GIT_REPOSITORY_URL"
# It'll export the git repository url to the environment variable

git clone $GIT_REPOSITORY_URL /home/app/output
# Above code will clone the repository to the output folder                                 

exec node script.js 
# It'll execute the script.js file

