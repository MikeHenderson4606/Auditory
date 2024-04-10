
import Song from "../../../Song";

function Posts() {
    const posts = [
        {
            title: 'Song1',
            artist: 'Artist 1',
            poster: 'Person 1',
            description: 'Description 1',
            link: 'https://www.spotify.com'
        },
        {
            title: 'Song2',
            artist: 'Artist 2',
            poster: 'Person 2',
            description: 'Description 2',
            link: 'https://www.spotify.com'
        },
        {
            title: 'Song3',
            artist: 'Artist 3',
            poster: 'Person 3',
            description: 'Description 3',
            link: 'https://www.spotify.com'
        },
        {
            title: 'Song4',
            artist: 'Artist 4',
            poster: 'Person 4',
            description: 'Description 4',
            link: 'https://www.spotify.com'
        },
        {
            title: 'Song5',
            artist: 'Artist 5',
            poster: 'Person 5',
            description: 'Description 5',
            link: 'https://www.spotify.com'
        }
    ]

    return (
        <div>
            <h2 className="text-center">Your Posts</h2>
            <div>
                <input placeholder="Search Posts" className="form-control" />
                <button className="btn btn-success mt-1">
                    New Post
                </button>
            </div> <br />
            <div className="overflow-y-auto border border-light rounded bg-light" style={{height: "29em"}}>
                {posts.map((post, index) => {
                    return (
                        <div className="p-3" key={index}>
                            <Song title={post.title} artist={post.artist} poster={post.poster} link={post.link} description={post.description} />
                        </div>
                    );
                })}
            </div>
        </div>
        
    );
}

export default Posts;