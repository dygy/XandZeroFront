const host: string = "http://127.0.0.1:3333/api/"

declare type matrixReq = {
    matrix :  number[][],
    winner: number
}
const rpc = async (headers: Headers, isStr = false) : Promise<matrixReq | string> => {
    console.log(headers.get('request'), isStr)
    let data: matrixReq|string = {winner: 0, matrix: new Array([3][3])}
    await fetch(host,{headers})
        .then(res=>{
            //return res.text()
            if (isStr) return res.text()
            return res.json()
        })
        .then(res => {
            console.log(res)
            if (isStr) return data = res
            return data = JSON.parse(res)
        })
        .catch(e=>{
            console.log(e)
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
const refresh = async (): Promise<matrixReq> => {
    const headers = new Headers();
    headers.append("request", "refresh");
    headers.append("id", localStorage.getItem('id') || '');
    localStorage.clear()
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
}