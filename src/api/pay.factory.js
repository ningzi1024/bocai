import ajax from "./API.base"
import { extentdData } from "./API.base"
function payFactory(payName, obj) {
    return ajax.post("", {
        ["Get" + payName + "ReqParamsCommand"]: extentdData(obj)
    });
}


export default payFactory;