import ajax from "./API.base"
import { extentdData } from "./API.base"
import apiName from "./API.list"
let api = {
    /**
     * 获取游戏分类
     */
    [apiName.GetGameCategory](obj) {
        return ajax.post("", { [apiName.GetGameCategory]: extentdData(obj) });
    },
    /**
     * 获取平台游戏列表
     */
    [apiName.GetGameList](obj) {
        return ajax.post("", { [apiName.GetGameList]: extentdData(obj) });
    },
    /**
     * 获取平台游戏列表
     */
    [apiName.WinRecord](obj) {
        return ajax.post("", { [apiName.WinRecord]: extentdData(obj) });
    },
    /**
     * 检测是否需要更新
     */
    [apiName.ChkGameListUpdate](obj) {
        return ajax.post("", { [apiName.ChkGameListUpdate]: extentdData(obj) });
    },

    /**
     * 收藏游戏。
     */
    [apiName.AddGameFavorite](obj) {
        return ajax.post("", { [apiName.AddGameFavorite]: extentdData(obj) });
    },

    /**
     * 取消收藏游戏。
     */
    [apiName.DeleteGameFavorite](obj) {
        return ajax.post("", { [apiName.DeleteGameFavorite]: extentdData(obj) });
    },
    /**
     * 获取收藏游戏
     */
    [apiName.GetGameFavorite](obj) {
        return ajax.post("", { [apiName.GetGameFavorite]: extentdData(obj) });
    },
    /**
     * PT入口
     */
    [apiName.GetPTEntry](obj) {
        return ajax.post("", { [apiName.GetPTEntry]: extentdData(obj) });
    },
    /**
     * AG入口
     */
    [apiName.GetAGXINEntry](obj) {
        return ajax.post("", { [apiName.GetAGXINEntry]: extentdData(obj) });
    },
    /**
     * AG入口
     */
    [apiName.GetAGINEntry](obj) {
        return ajax.post("", { [apiName.GetAGINEntry]: extentdData(obj) });
    },
    /**
     * MGIN入口
     */
    [apiName.GetMGINEntry](obj) {
        return ajax.post("", { [apiName.GetMGINEntry]: extentdData(obj) });
    },
    /**
     * MG入口
     */
    [apiName.GetMGEntry](obj) {
        return ajax.post("", { [apiName.GetMGEntry]: extentdData(obj) });
    },
    /**
     * BSG入口
     */
    [apiName.GetBSGEntry](obj) {
        return ajax.post("", { [apiName.GetBSGEntry]: extentdData(obj) });
    },
    /**
     * GG入口
     */
    [apiName.GetGGEntry](obj) {
        return ajax.post("", { [apiName.GetGGEntry]: extentdData(obj) });
    },
    /**
     * DT入口
     */
    [apiName.GetDTEntry](obj) {
        return ajax.post("", { [apiName.GetDTEntry]: extentdData(obj) });
    },
    /**
     * tth入口
     */
    [apiName.GetTTGEntry](obj) {
        return ajax.post("", { [apiName.GetTTGEntry]: extentdData(obj) });
    },
    /**
     * 波音入口
     */
    [apiName.GetBBINEntry](obj) {
        return ajax.post("", { [apiName.GetBBINEntry]: extentdData(obj) });
    },
    /**
     * SW入口
     */
    [apiName.GetPT_SkyWindEntry](obj) {
        return ajax.post("", { [apiName.GetPT_SkyWindEntry]: extentdData(obj) });
    },
    /**
     * 获取游戏平台
     */
    [apiName.GamePlatformList](obj) {
        return ajax.post("", { [apiName.GamePlatformList]: extentdData(obj) });
    }
}

export default api;