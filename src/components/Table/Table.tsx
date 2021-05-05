import './Table.css'
import {useEffect, useState} from "react";
import api from "../../api/api";
import Figure from "../Figure/Figure";
const map = (array: number[][]| number[], setUnit: (row: number, col: number)=>void, col?: number): JSX.Element[] | undefined => {
    // @ts-ignore
    return array?.map((e, key)=>{
        return typeof e !== "number" && typeof col !== "number"
            ? <div key={key} children={map(e, setUnit, key)}/>
            // eslint-disable-next-line no-mixed-operators
            : <Figure col={col && col || 0} row={key} key={key} player={e} setUnit={setUnit}/>
    })
}

declare type props = {
    uuid : string | null
}



export default ({uuid}: props) => {
    const [matrix, setMatrix]: any = useState(undefined)
    const [winner, setWinner] = useState(0)

    const setUnit = (col: number, row: number) => {
        api.placeUnit(uuid,`${row}${col}`).then((response)=>{
            setMatrix(response.matrix)
            setWinner(response.winner)
        })
    }

    useEffect(()=> {
        setInterval(()=>{
            api.GETTable().then((response)=>{
                setMatrix(response.matrix)
                setWinner(response.winner)
                console.log(response.matrix.length)
            })
        }, 2000)
    },[])
    console.log(matrix)
    return (<div className={'App-table'}>
            <div>
                {map(matrix, setUnit)}
            </div>
    </div>)

}

