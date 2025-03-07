import {config} from 'dotenv'
config()

const envConfig = {
    
    port : process.env.PORT,
    database_url : process.env.DATABASE_URL
    
}

export default envConfig