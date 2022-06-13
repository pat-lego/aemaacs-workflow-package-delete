var axios = require('axios')

const WORKFLOW_PACKAGES = '/var/workflow/packages.1.json'

async function getWorkflowPackages(url, username, password) {
    console.log(`Making HTTP GET request to ${url}${WORKFLOW_PACKAGES}`)
    return await axios.get(`${url}${WORKFLOW_PACKAGES}`, {
        headers: {
            'Authorization': "Basic " + Buffer.from(username + ":" + password).toString('base64')
        }
    });
}

async function postPackage(url, path, username, password, operation) {
    console.log(`Making HTTP POST request to ${url}${path}`)
    
    return await axios.post(`${url}${path}`, {":operation": operation}, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': "Basic " + Buffer.from(username + ":" + password).toString('base64')
        }
    })
}


(async () => {
    var args = process.argv.slice(2)
    try {
        var result = await getWorkflowPackages(args[0], args[1], args[2])
        console.log("Here are the workflow results");
        console.log(result.data)
        
        for (var key of Object.keys(result.data)) {
            if (key.includes('generated-package')) {
                console.log(`${key} matches the criteria about to delete`)
                postPackage(args[0],`/var/workflow/packages/${key}`, args[1], args[2], "delete")
            } else {
                console.log(`${key} does not match criteria skipping`)
            }
        }        
    } catch (e) {
        console.error(e)
    }
})();
