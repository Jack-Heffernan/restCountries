import { Link } from 'react-router-dom';

const CountryCard = (props) => {
    return (
        <div className="card w-96 glass p-4">
            <figure><img classname="" src={props.flag} alt="img"/></figure>
                <div className="card-body">
                    <h2 className="card-title"><Link to={`/country/${props.name}`}>{props.name}</Link></h2>
                    <p>{props.region}</p>
                <div className="card-actions justify-end">
            <button className="btn btn-primary" src={`/country/${props.name}`}>Learn now!</button>
     </div>
  </div>
</div>
    );
};

export default CountryCard;