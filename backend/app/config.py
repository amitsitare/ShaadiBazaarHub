import os
from pathlib import Path
from pydantic import BaseModel
from urllib.parse import quote_plus

# Try to load .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    # Load .env file from the backend directory
    backend_dir = Path(__file__).parent.parent
    env_path = backend_dir / ".env"
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    # python-dotenv not installed, continue without it
    pass


class Settings(BaseModel):
    # Database configuration - set these separately
    db_host: str = os.getenv("DB_HOST", "localhost")
    db_port: int = int(os.getenv("DB_PORT", "5432"))
    db_name: str = os.getenv("DB_NAME", "shaadisphere")
    db_user: str = os.getenv("DB_USER", "postgres")
    db_password: str = os.getenv("DB_PASSWORD", "your_password_here")
    
    # Construct database URL from components
    @property
    def database_url(self) -> str:
        # URL encode the password to handle special characters like @, #, etc.
        encoded_password = quote_plus(self.db_password)
        return f"postgresql://{self.db_user}:{encoded_password}@{self.db_host}:{self.db_port}/{self.db_name}"
    
    # JWT Configuration
    jwt_secret: str = os.getenv("JWT_SECRET", "dev_secret_change_me")
    jwt_algorithm: str = os.getenv("JWT_ALGORITHM", "HS256")
    jwt_expires_minutes: int = int(os.getenv("JWT_EXPIRES_MINUTES", "120"))
    
    # Server Configuration
    api_host: str = os.getenv("API_HOST", "0.0.0.0")
    api_port: int = int(os.getenv("API_PORT", "8000"))
    
    # Frontend URL for CORS
    frontend_url: str = os.getenv("FRONTEND_URL", "http://localhost:5173")


settings = Settings()
