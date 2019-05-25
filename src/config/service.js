Import api from ./axios

Const service = 
{
  getProfile : async (id)=>
  { 
    let res = await api.get('',id)
    return res
  },
  getScore : async ()=>
  {
    return await api.get('')
  }
  insertScore : async (data)=>
  {
    return await api.post('',data)
  }
  updateScore : async(data)=>
  {
    return await api.put('',data)
  }

}

Export default service;
