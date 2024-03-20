
import Song from "./Song";
import './index.css';

function Feed() {

    const posts = [
        {
            title: 'Song1',
            artist: 'Artist 1',
            link: 'www.spotify.com'
        },
        {
            title: 'Song2',
            artist: 'Artist 2',
            link: 'www.spotify.com'
        },
        {
            title: 'Song3',
            artist: 'Artist 3',
            link: 'www.spotify.com'
        },
        {
            title: 'Song4',
            artist: 'Artist 4',
            link: 'www.spotify.com'
        },
        {
            title: 'Song5',
            artist: 'Artist 5',
            link: 'www.spotify.com'
        }
    ]

    return (
        <div className="row d-flex justify-content-center">
            <div className="feed-offset col-8">
                {posts.map((post, index) => {
                    return (
                        <div className="">
                            <Song title={post.title} artist={post.artist}/>
                        </div>
                    );
                })}
            </div>
        </div>
        
    );
}

export default Feed;