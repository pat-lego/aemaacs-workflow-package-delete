var axios = require('axios')

async function getWorkflowPackages(url, path, username, password) {
    console.log(`Making HTTP GET request to ${url}${path}`)
    return await axios.get(`${url}${path}`, {
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
        var result = await getWorkflowPackages(args[0], args[1], args[2], args[3])
        console.log("Here is the result");
        console.log(result.data)
        
        for (var key of Object.keys(result.data)) {
            if (key.includes('generated-package')) {
                console.log(`${key} matches the criteria about to delete`)
                await deletePackage(args[0], `/var/workflow/packages/${key}`, args[2], args[3])
            } else {
                console.log(`${key} does not match criteria skipping`)
            }
        }
    } catch (e) {
        console.error(e)
    }
})();
