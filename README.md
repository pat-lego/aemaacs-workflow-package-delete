# AEMaaCS Simple Package Delete

This repository performs axios requests to delete workflow packages in AEMaaCS.

## Setup

1. Create a local user in AEMaaCS 
2. Give the user the following permission jcr:all under /var/workflow
3. Make sure you have node and npm installed
4. Run npm install in order to download the dependencies

## Execution

node index.js https://author-pID-eID.adobeaemcloud.com USERNAME PASSWORD

