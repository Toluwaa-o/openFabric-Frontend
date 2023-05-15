import { Link } from 'react-router-dom'

export default function Popup() {

    return (
        <div className='error'>
            <h3>Error....</h3>
            <p>Looks like something went wrong :/</p>
            <Link to='/store'>Back to store</Link>
        </div>
    )
}