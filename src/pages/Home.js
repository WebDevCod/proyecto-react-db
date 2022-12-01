import { Navigate } from "react-router-dom";


export default function Home() {

  if (localStorage.getItem('token') == null || localStorage.getItem('token') === '') {
    return (<Navigate push to="/login" />);
  }

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}