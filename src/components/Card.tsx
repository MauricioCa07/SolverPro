import "./Card.css";

type Props = {
  title: string;
  description: string;
  img: string;
};

function Card({ title, description, img }: Props) {
  return (
    <div className="card">
      <img src={img} className="card-img-top"></img>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">
          Ir al metodo
        </a>
      </div>
    </div>
  );
}

export default Card;
