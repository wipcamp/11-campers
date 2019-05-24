import Axios from 'axios';
let api ={
    get:(path,header) => {
        Axios({
            method: 'get',
            url: `/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },
    post:(path,body,header) => {
        Axios({
            method: 'post',
            body:body,
            url: `/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },put:(path,body,header) => {
        Axios({
            method: 'put',
            body:body,
            url: `/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },
}
export default api;