const host: string = "http://127.0.0.1:3333/api/"

declare type matrixReq = {
    matrix :  number[][],
    winner: number
}
const rpc = async (headers: Headers, isStr = false) : Promise<matrixReq | string> => {
    let data: matrixReq|string = '';
    await fetch(host,{headers})
        .then(res=>{
            //return res.text()
            if (isStr) return res.text()
            return res.json()
        })
        .then(res => {
            if (isStr) return data = res
            return data = JSON.parse(res)
        })
        .catch(e=>{
            console.warn(e)
        })
    return data;
}



const placeUnit = async (id: string | null, action: string): Promise<matrixReq> => {
    const headers = new Headers();
    headers.append("request", "placeUnit");
    headers.append("id", id || '');
    headers.append("action", action);

    return await rpc(headers) as matrixReq
}

const GETTable = async () : Promise<matrixReq> => {
    const headers = new Headers();
    headers.append("request", "GETTable");

    return await rpc(headers, false) as matrixReq
}

const checkUUID = async (uuid: string) : Promise<boolean> => {
    const headers = new Headers();
    headers.append("request", "checkUUID");
    headers.append("id", uuid);
    const data = await rpc(headers, true)

    return data === 'true'
}

const refresh = async (setUUID: (uuid: string|null)=>void): Promise<matrixReq> => {
    const headers = new Headers();
    headers.append("request", "refresh");
    headers.append("id", localStorage.getItem('id') || '');
    localStorage.removeItem('id')
    setUUID(null)

    return await rpc(headers, true) as matrixReq
}
const giveSlot = async (): Promise<string> => {
    const headers = new Headers();
    headers.append("request", "giveSlot");

    return await rpc(headers, true) as string
}

export default {
    GETTable,
    placeUnit,
    refresh,
    giveSlot,
    checkUUID
}