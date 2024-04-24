import { Link } from "react-router-dom";


function Comment({comment}: {comment:any}) {

    return (
        <div className="p-3 mt-3 border border-success rounded">
            <Link to={`/user/${comment.commenter}`} className="btn btn-outline-success" style={{border: "none"}}>
                {comment.commenterName}
            </Link>
            <p className="ms-4">
                {comment.comment}
            </p>
        </div>
    )
}

export default Comment;