import ajax from "axios"
export default function () {
    let scripts = document.getElementsByTagName("script");
    let version = "";
    scripts.forEach(item => {
        let result = item.src.match(/^.*manifest\.(.*)\.js$/);
        if (result.length >= 2) {
            version = result[1];
            return false;
        }
    })
    if (!version) {
        //is local development environment
        return new Promise(resolve => resolve({ version: "", level: 0, same: true }))
    } else {
        //get app version from remote
        return ajax.post("/version.json").then(rep => {
            let data = rep.data;

            data.same = data.version === version ? true : false;

            return data
        }).catch(err => {
            console.log("check version failed ,try again later...")
            return err
        })
    }
}