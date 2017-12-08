
const config = require("../config/index")
const fs = require("fs")

module.exports = function () {
    
    let manifest = config.build.assetsRoot + "/manifest.json";


    if (fs.existsSync(manifest)) {
        let data = JSON.parse(fs.readFileSync(manifest))

        let app = {
            version: "",
            level: 0,
        }

        //list static files
        let staticFiles = [];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                staticFiles.push(data[key]);
                if (key == "manifest.js") {
                    //create version.json for app
                    let result = data[key].match(/^.*manifest\.(.*)\.js$/)
                    if (result.length >= 2) app.version = result[1];
                }
            }
        }

        fs.writeFileSync(config.build.assetsRoot + "/static.list", JSON.stringify(staticFiles))
        console.log("created static list file \n")
        fs.writeFileSync(config.build.assetsRoot + "/version.json", JSON.stringify(app))
        console.log("created version json file \n")
        fs.unlinkSync(manifest);
        console.log("deleted manifest json file \n")

    } else {
        throw 'no such as "manifest.json" file'
    }
}

