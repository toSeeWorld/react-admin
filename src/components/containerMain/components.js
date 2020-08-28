const components = [];
const files = require.context("../../views",true,/\.js$/)
files.keys().map((item)=>{
    if(item.includes("login") || item.includes("index") || item.includes("components")) {
        return false;
    }
    const jsonObj = {};
    const itemSpilt = item.split(".");
    jsonObj.path = `/index${itemSpilt[1]}`
    jsonObj.component =  files(item).default ;
    components.push(jsonObj);

})
export default components