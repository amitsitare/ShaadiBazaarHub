#!/usr/bin/env python3
"""
Script to remove duplicate services from the database
"""

import os
import sys
from pathlib import Path
import psycopg

# Try to load .env file if python-dotenv is available
try:
    from dotenv import load_dotenv
    backend_dir = Path(__file__).parent
    env_path = backend_dir / ".env"
    if env_path.exists():
        load_dotenv(env_path)
        print(f"Loaded environment from: {env_path}")
except ImportError:
    pass


def get_db_config():
    """Get database configuration from environment variables"""
    return {
        'host': os.getenv("DB_HOST", "localhost"),
        'port': int(os.getenv("DB_PORT", "5432")),
        'dbname': os.getenv("DB_NAME", "shaadisphere"),
        'user': os.getenv("DB_USER", "postgres"),
        'password': os.getenv("DB_PASSWORD", "your_password_here")
    }


def cleanup_duplicates():
    """Remove duplicate services, keeping only the first one"""
    config = get_db_config()
    
    if config['password'] == 'your_password_here':
        print("ERROR: Please set DB_PASSWORD in your .env file!")
        return 1
    
    try:
        print("Connecting to database...")
        with psycopg.connect(**config) as conn:
            print("Connected successfully!")
            
            # Find and delete duplicates
            # Keep the service with the lowest ID for each (provider_id, name) combination
            conn.execute("""
                DELETE FROM services s1
                USING services s2
                WHERE s1.provider_id = s2.provider_id
                  AND s1.name = s2.name
                  AND s1.id > s2.id
            """)
            
            deleted_count = conn.rowcount
            conn.commit()
            
            print(f"✅ Removed {deleted_count} duplicate services")
            print("✅ Database cleanup completed!")
            
            return 0
            
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(cleanup_duplicates())

