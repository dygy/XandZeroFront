import './Table.css'
import {useEffect, useState} from "react";
import api from "../../api/api";
import Figure from "../Figure/Figure";
import WinnerPopup from "../WinnerPopup/WinnerPopup";

const map = (
    array: number[][],
    setUnit: (row: number, col: number)=>void,
    setIsPopUp: (isPopup: boolean)=>void,
    isPopUp: boolean ): JSX.Element[] | undefined => {
    const isEmpty: boolean = array.filter(e=>e.some(e=>0)).length < 1;
    if (isEmpty !== isPopUp) {
        setIsPopUp(isEmpty)
    }
    //setIsPopUp(array.filter(e=>e.some(e=>0)).length < 1)

    return array?.map((e, col)=>{
        return  <div key={col} children={e.map((e, row)=>(
                <Figure col={col} row={row} key={col+row} player={e} setUnit={setUnit}/>
            ))}/>
            // eslint-disable-next-line no-mixed-operators
    })
}

declare type props = {
    uuid : string | null
}



export default ({uuid}: props) => {
    const [matrix, setMatrix] = useState([[0]])
    const [winner, setWinner] = useState(0)
    const [isPopup, setIsPopup] = useState(false)

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
            })
        }, 5000)
    },[])

    return (<div className={'App-table'}>
            <div>
                { matrix.length === 3 && (
                    <>
                        {(winner|| isPopup) && <WinnerPopup winner={winner}/>}
                        {map(matrix||[], setUnit, setIsPopup, isPopup)}
                    </>
                )
                }
            </div>
    </div>)

}

