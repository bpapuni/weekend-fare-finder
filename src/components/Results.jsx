const Results = ({ airports, data }) => {
    const dataArray = JSON.parse(data);
    const NO_DEALS_FOUND = "No upcoming weekend deals found";         

    return (
        <>
           {
                dataArray !== null ?
                <>
                    <h3>Return flights {airports.outbound} to {airports.return}</h3>
                    {
                        dataArray === NO_DEALS_FOUND ?
                        <div>{NO_DEALS_FOUND}</div> :
                        dataArray.map((result, index) => (
                            <div key={index} className="result">
                            {Object.entries(result).map(([key, value]) => (
                                <a key={index} href={value}>{key}</a>
                            ))}
                            </div>
                        ))
                    }
                </> : null
           } 
        </>
    );
};

export default Results;