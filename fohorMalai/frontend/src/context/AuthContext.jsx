import { createContext } from "react"

const userContext = createContext();


const AuthContext = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const login = () => {

    }
     
    const logout = () => {

    }

  return (
    <div>
      
    </div>
  )
}

export default AuthContext
