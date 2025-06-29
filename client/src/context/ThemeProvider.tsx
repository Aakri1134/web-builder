import {
  createContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react"

type ThemeContextType = {
  user: any
  setUser: Dispatch<SetStateAction<any>>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const ThemeContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<any>(undefined)

  return (
    <ThemeContext.Provider value={{ user, setUser }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  return useContext(ThemeContext)
}
