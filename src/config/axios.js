import Axios from 'axios';
let api ={
    get:(path,header) => {
        Axios({
            method: 'get',
            url: `${process.env.REACT_APP_PATH_CAMPERS}/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },
    post:(path,body,header) => {
        Axios({
            method: 'post',
            body:body,
            url: `${process.env.REACT_APP_PATH_CAMPERS}/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },put:(path,body,header) => {
        Axios({
            method: 'put',
            body:body,
            url: `${process.env.REACT_APP_PATH_CAMPERS}/${path}`,
            withCredentials: true,//อันนี้ไม่ชัวต้องใส่ไหม
            headers: { 'Authorization': `Bearer ${header}` }
        })
    },
}
export default api;