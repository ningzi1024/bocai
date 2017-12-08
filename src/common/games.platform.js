
import config from "./evn.config"
const platformKV = {
    15: { id: 15, name: "PT", cnname: "PT厅", dyname: "PT电游", egbanner: config.static + "static/img/Eg-Pic-PT.jpg", item_icon_root: "ptg", entry: "GetPTEntry", sort: 0 },
    16: { id: 16, name: "MG", cnname: "MG厅", dyname: "MG电游", item_icon_root: "mgg", entry: "GetMGEntry", sort: 9 },
    17: { id: 17, name: "MG_IN", cnname: "MG国际厅", dyname: "MG电游", egbanner: config.static + "static/img/Eg-Pic-MG_IN.jpg", item_icon_root: "mgg", entry: "GetMGINEntry", sort: 1 },
    21: { id: 21, name: "DT", cnname: "DT厅", dyname: "DT电游", egbanner: config.static + "static/img/Eg-Pic-DT.jpg", item_icon_root: "dtgg", entry: "GetDTEntry", sort: 5 },
    9: { id: 9, name: "BBIN", cnname: "波音厅", egbanner: config.static + "static/img/Eg-Pic-BBIN.jpg", item_icon_root: "bbing", entry: "GetBBINEntry", sort: 6 },
    12: { id: 12, name: "AG_AGIN", cnname: "AG国际厅", dyname: "AG电游", egbanner: config.static + "static/img/Eg-Pic-AG_AGIN.jpg", item_icon_root: "agg", entry: "GetAGXINEntry", sort: 4 },
    11: { id: 11, name: "AG_AG", cnname: "AG旗舰厅", dyname: "AG电游", entry: "GetAGINEntry", sort: 4 },
    18: { id: 18, name: "TTG", cnname: "TTG厅", dyname: "TTG电游", egbanner: config.static + "static/img/Eg-Pic-TTG.jpg", item_icon_root: "ttgg", entry: "GetTTGEntry", sort: 3 },
    20: { id: 20, name: "GG", cnname: "GG厅", dyname: "GG电游", egbanner: config.static + "static/img/Eg-Pic-GG.jpg", entry: "GetGGEntry", sort: 8 },
    22: { id: 22, name: "SW", cnname: "SW厅", dyname: "SW电游", egbanner: config.static + "static/img/Eg-Pic-SW.jpg", item_icon_root: "swg", entry: "GetPT_SkyWindEntry", sort: 7 }
}
let platformArry = []

for (var key in platformKV) {
    let item = platformKV[key];
    item.id = parseInt(key);
    platformArry.push(item)
}
platformArry = platformArry.sort((a, b) => a.sort - b.sort);
export { platformKV }

export default platformArry