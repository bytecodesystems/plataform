import { Link } from "react-router-dom"

const Sidebar = ({ modules }) => {

    return (
        <div className="d-flex gap-5">
            {modules.map(module => (
                <Link
                    key={`link_to_route_${module.path}_${module.url}`}
                    to={`/plataform/${module.route}`}
                >
                    {module.name}
                </Link>
            ))}
        </div>
    )
}

export default Sidebar