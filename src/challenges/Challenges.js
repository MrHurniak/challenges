import "./Challenges.css";

export default function Challenges(props) {
  return (
    <div className="container">
      { props.challenge?.component }
    </div>
  )
}
