import { Link } from "react-router-dom"

export default function Button({to, text}) {
  return (
    <Link className="navButton" to={to} >
        {text}
    </Link>
  )
}
