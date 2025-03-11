import { createContext,ReactNode,useState,useContext } from "react";

interface AuthContextType{
  username:string,
  setUsername:(name:string)=>void
}
const AuthContext=createContext<AuthContextType | undefined>(undefined)
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [username, setUsername] = useState<string>("");
  
    return (
      <AuthContext.Provider value={{ username, setUsername }}>
        {children}
      </AuthContext.Provider>
    );
  };