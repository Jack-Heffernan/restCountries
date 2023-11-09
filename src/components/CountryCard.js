import { Link } from 'react-router-dom';

const CountryCard = (props) => {
    return (
        <div className="card w-96 glass p-4">
            <figure><img classname="" src={props.flag} alt="img"/></figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title"><Link to={`/country/${props.name}`}>{props.name}</Link></h2>
                    <p>{props.region}</p>
                <div className="card-actions justify-end">
            <a href={`/country/${props.name}`}>
            <button className="btn btn-secondary" type="button" >View</button> </a>
     </div>
  </div>
</div>
    );
};

export default CountryCard;