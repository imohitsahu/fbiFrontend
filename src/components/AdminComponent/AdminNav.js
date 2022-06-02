import { Link } from "react-router-dom";


function AdminNav() {

    return (
        <>
            <div className="container p-4">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <Link className="nav-item nav-link" data-toggle="tab" to="/admin" role="tab">Institutes</Link>
                        <Link className="nav-item nav-link" data-toggle="tab" to="/allstu" role="tab">Students</Link>
                        <Link className="nav-item nav-link" data-toggle="tab" to="/allenq" role="tab">Enquiries</Link>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default AdminNav;