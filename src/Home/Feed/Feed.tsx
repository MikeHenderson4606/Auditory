
import Song from "./Song";

function Feed() {

    const posts = [
        {
            title: 'Song1',
            artist: 'Artist 1'
        },
        {
            title: 'Song2',
            artist: 'Artist 2'
        },
        {
            title: 'Song3',
            artist: 'Artist 3'
        },
        {
            title: 'Song4',
            artist: 'Artist 4'
        },
        {
            title: 'Song5',
            artist: 'Artist 5'
        }
    ]

    function disableAllOtherButtons() {

    }

    return (
        <div className="border-component">
            <h1>The Feed</h1>
            {posts.map((post, index) => {
                return (
                    <div>
                        <Song title={post.title} artist={post.artist}/>
                    </div>
                );
            })}
        </div>
    );
}

export default Feed;