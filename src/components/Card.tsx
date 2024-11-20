import "./Card.css";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  img: string;
  route: string;
};

function Card({ title, description, img, route }: Props) {
  return (
    <div className="card">
      <img src={img} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <Link className="btn-primary Link" to={route}>
          Go to method
        </Link>
      </div>
    </div>
  );
}

export default Card;
