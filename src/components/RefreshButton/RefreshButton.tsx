import './RefreshButton.css'
import refresh from '../../img/refresh.png'
import api from "../../api/api";

export default () => (
    <div className={'App-Refresh'} onClick={()=>api.refresh()}>
        <img src={refresh}/>
    </div>
)


