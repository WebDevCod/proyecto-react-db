import { Navigate } from "react-router-dom";

function SessionControl() {

  if (localStorage.getItem('token') == null || localStorage.getItem('token') === '') {
    return (<Navigate push to="/login" />);
  }

  return (
    <></>
  )

}

export default SessionControl;
