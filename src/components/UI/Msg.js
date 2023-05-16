import { useSelector } from "react-redux"

export default function Msg() {
    const msg = useSelector(state => state.ui.doneMsg)
    const isError = useSelector(state => state.ui.isError)

  return (
    <>
    {msg ? !isError ? <div className="success">Order Successfully Placed!</div> : <div style={{background: 'red'}} className="success">Something went wrong, Please try again!</div> : null}
    </>
  )
}
