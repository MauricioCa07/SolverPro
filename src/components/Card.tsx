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
        <a href="#" className="btn btn-primary">
          <Link className="Link" to={route}>
            Ir al metodo
          </Link>
        </a>
      </div>
    </div>
  );
}

export default Card;
