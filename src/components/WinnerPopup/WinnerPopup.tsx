import './WinnerPopup.css'

declare type props ={
    winner :  number
}

export default ({winner}: props) => (
    <div className={'App-Popup'}>
        {
            winner !== 0
                ? winner+' is a winner'
                : 'no one victorious today'
        }
    </div>
)


