import apiName from "@/api/API.list"
import game from "@/api/game"
import gVar from "./GlobalVars"
import underscore from "underscore"
import Cache from './pub.cache'

/**
 * 游戏平台ID
 *  游戏分类 Category
 */
export default {

    /**
     * 获取游戏平台分类
     * @param {int} 游戏平台id
     */
    getCategory(platformId) {
        return new Promise((resolve, reject) => {
            let _c = new Cache({ key: "category_" + platformId });
            if (_c.isUseCache) {
                resolve({ Status: 1, data: _c.getCache(), cache: true })
            } else {
                game[apiName.GetGameCategory]({
                    GameType: platformId
                }).then(rep => {
                    let data = rep.data;
                    if (data.Status === 1) {
                        //设置缓存
                        let sortedData = underscore.chain(data.row).sortBy(item => item.Sort).value();       
                        data.row = sortedData;              
                        _c.setCache(data);
                        resolve({ Status: 1, data: data, cache: false })
                    } else {
                        resolve(rep)
                    }
                }).catch(err => {
                    reject(err);
                })
            }
        });
    },
    /**
     * 获取游戏列表   
     * @param {int} platformId 游戏平台id
     */
    getGameList(platformId) {

        return new Promise((resolve, reject) => {
            // debugger
            let _pid = platformId;
            let _cache = new Cache({ key: `${_pid}_gamelist` })
            let c_data = _cache.getCache()
            if (_cache.isUseCache) {
                resolve({ data: c_data, cache: true })
            } else {
                game[apiName.ChkGameListUpdate]({
                    GameType: platformId,
                    LastDate: c_data.LastDate || undefined,
                    IsMobile: true
                }).then(rep => {
                    
                    let data = rep.data;
                    if (data.row == 0) {
                        //使用缓存
                        //这里处理一下保存时间
                        _cache.setCache(c_data);
                        resolve({ data: c_data, cache: true })
                    } else {
                        game[apiName.GetGameList]({ GameType: platformId, IsMobile: true }).then(rep => {
                            let data = rep.data;
                            if (data.Status === 1) {
                                //设置好排序
                                let gamelist = underscore
                                    .chain(data.row.GameList)
                                    // .where({ Mobile: 1 })
                                    .map(item => {
                                        if (!item.Sort) {
                                            item.Sort = 0;
                                        }
                                        return item;
                                    }).sortBy(item => -item.ModifyTime).value();
                                    console.log(gamelist)
                                let hotGames = underscore.chain(gamelist).where({ Hot: 1 }).sortBy(item => -item.Sort).first(10).value()
                                data.row.GameList = gamelist;
                                
                                data.row.hot = hotGames;
                                data.GameType = platformId;
                                console.log(data.row.GameList)
                                //设置缓存 
                                _cache.setCache(data);
                                // gVar.Games_Cache = cache;
                                resolve({ Status: 1, data: data, cache: false })
                            } else {
                                resolve(rep)
                            }
                        }).catch(err => {
                            reject(err);
                        });
                    }
                })
            }
        });
    }
}
