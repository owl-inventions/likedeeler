#!/bin/bash

git fetch --all
VERSION=$(git tag | sort -V | tail -n 1)

if [ $# -eq 0 ]; then
    VERSION=$(echo $VERSION | awk -F. '{OFS="."; $2+=1; $3=0; print $0}')
else
    if [ "$1" == "major" ]; then
        VERSION=$(echo $VERSION | awk -F. '{OFS="."; $1+=1; $2=0; $3=0; print $0}')
    elif [ "$1" == "minor" ]; then
        VERSION=$(echo $VERSION | awk -F. '{OFS="."; $2+=1; $3=0; print $0}')
    elif [ "$1" == "patch" ]; then
        VERSION=$(echo $VERSION | awk -F. '{OFS="."; $NF+=1; print $0}')
    else
        echo "Invalid argument. Please specify 'major', 'minor', or 'patch'."
        exit 1
    fi
fi

gh release create $VERSION --generate-notes --title $VERSION
