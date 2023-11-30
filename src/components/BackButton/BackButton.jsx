import { useNavigate } from 'react-router-dom';


const BackButton = () => {
    const navigate = useNavigate();
  return (
    <div>
       <button onClick={() => navigate('/')}>Go Back</button>
    </div>
  )
}

export default BackButton;
