import './RefreshButton.css'
import refresh from '../../img/refresh.png'
import api from "../../api/api";
declare type props ={
    setUuid : (uuid: null|string)=>void,
}
export default ({setUuid}: props) => (
    <div className={'App-Refresh'} onClick={()=>api.refresh(setUuid)}>
        <img src={refresh}/>
    </div>
)


