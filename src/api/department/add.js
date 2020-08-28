import service from "../../../src/utils/request";

export function Add(data){
    return service.request({
        url: "/department/add/",
        method: "post",
        data, // 请求类型为 post 时
    })
}
export function GetLists(data){
    return service.request({
        url: "/department/list/",
        method: "post",
        data, // 请求类型为 post 时
    })
}

export function DeleteList(data){
    return service.request({
        url: "/department/delete/",
        method: "post",
        data, // 请求类型为 post 时
    })
}

 export default Add;