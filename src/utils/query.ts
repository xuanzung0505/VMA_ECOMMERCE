import { useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const query = useQuery()

export { query }
