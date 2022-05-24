var axios = require('axios')

const WORKFLOW_PACKAGES = '/var/workflow/packages.1.json'

async function getWorkflowPackages(url, username, password) {
    console.log(`Making HTTP GET request to ${url}${WORKFLOW_PACKAGES}`)
    return await axios.get(`${url}${WORKFLOW_PACKAGES}`, {
        auth: {
            username: username,
            password: password
        }
    });
}

async function deletePackage(url, path, username, password) {
    console.log(`Making HTTP GET request to ${url}${path}`)
    return await axios.delete(`${url}${path}`, {
        auth: {
            username: username,
            password: password
        }
    });
}



(async () => {
    var args = process.argv.slice(2)
    try {
        var result = await getWorkflowPackages(args[0], args[1], args[2])
        console.log("Here is the result");
        console.log(result.data)
        
        for (var key of Object.keys(result.data)) {
            if (key.includes('generated-package')) {
                console.log(`${key} matches the criteria about to delete`)
                await deletePackage(args[0], `/var/workflow/packages/${key}`, args[1], args[2])
            } else {
                console.log(`${key} does not match criteria skipping`)
            }
        }
    } catch (e) {
        console.error(e)
    }
})();
