
import Song from "../Song";

function GenericFeed() {
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
        <div className="feed-offset">
            {posts.map((post, index) => {
                return (
                    <div className="" key={index}>
                        <Song title={post.title} artist={post.artist} poster={post.poster} link={post.link} description={post.description} />
                    </div>
                );
            })}
        </div>
    );
}

export default GenericFeed;