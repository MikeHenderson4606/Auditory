

function SongDM(params:any) {
    const title = params.title;
    const artist = params.artist;
    const link = params.link;
    const id = params.id;

    return (
        <div className="bg-body-secondary border border-secondary rounded p-2">
            <span className='fs-5'>{title} by {artist}</span> <br />
            <span className='position-relative' style={{right: "5em"}}>
                <button className="btn btn-outline-success ms-2 border-0" >
                    <i className="fa fa-play-circle fa-2x"></i>
                </button>
                <a className="btn btn-outline-success ms-2 border-0 fs-4" target="_blank">
                    <i className="fa fa-ellipsis-v" />
                </a>
            </span>
        </div>
    )
}

export default SongDM;