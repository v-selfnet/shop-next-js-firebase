import { toast } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";


const GitHubLogin = () => {
    const handleGithubLogin = () => {
        toast.success('Comming Soon...')
    }
    return (
        <div>
            <FaGithub className="btn btn-ghost btn-circle btn-sm" onClick={handleGithubLogin} />
        </div>
    );
};

export default GitHubLogin;