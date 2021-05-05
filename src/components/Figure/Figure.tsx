import './Figure.css'
import cross from '../../img/cancel.png'
import zero from '../../img/zero.png'
declare type figureProps = {
    player: number,
    setUnit: (col: number, row: number)=>void,
    col: number,
    row: number,
}
const icon = (player: number) =>{
    if (player === 1) return zero
    if (player === 2) return cross
}

const style = (player: number) =>{
    if (player === 0) {
        return {
            boxShadow: "inset rgba(0.5, 0.5, 0.5, 0.1) 1px -1px 20px 20px",
            cursor: 'pointer',
        }
    } else return {}
}
export default ({player, setUnit, col, row}: figureProps) => (
    <div onClick={()=> player === 0 && setUnit(col, row)} style={style(player)} className={'App-Figure'}>
        {player !== 0 && <img src={icon(player)}/>}
    </div>
)


