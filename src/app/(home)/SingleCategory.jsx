import Image from 'next/image';

const SingleCategory = ({ category }) => {
    const { _id, id, name, imageurl, description } = category;
    return (
        <div>
            <div className="card w-96 bg-base-300 shadow-xl">
                <figure>
                    <Image
                        src={imageurl} alt={name}
                        width={600} height={600}
                    />  
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{description}</p>
                    <div className="card-actions mx-auto">
                        <button className="btn btn-primary btn-wide">Detail</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default SingleCategory;