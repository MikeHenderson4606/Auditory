

function SongDM({title, artist, link, id} : {title: string, artist: string, link: string, id: string}) {
    return (
        <div className="bg-body-secondary border border-secondary rounded p-2">
            <span className='fs-5'>{title} by {artist}</span> <br />
            <span className='position-relative'>
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