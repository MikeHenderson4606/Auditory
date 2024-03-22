
import { Link, useLocation } from "react-router-dom";
import './index.css';

function UserContacts() {
    const { pathname } = useLocation();
    const contactList = [
        {
            name: "Billy Bob",
            userId: "user1"
        },
        {
            name: "Susan Sally",
            userId: "user2"
        },
        {
            name: "Danger Dalton",
            userId: "user3"
        },
    ]

    return (
        <div className="border rounded contacts-width contacts-height">
            <div className="list-group overflow-y-scroll">
                {contactList.map((contact, index) => {
                    return (
                    <Link to={contact.userId} className={pathname.includes(contact.userId) ? "list-group-item list-group-item-action text-center list-group-item-success" : "list-group-item list-group-item-action text-center"} key={index}>
                        {contact.name}
                    </Link>)
                })}
            </div>
        </div>
    )
}

export default UserContacts;