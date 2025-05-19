from alembic import context
from app.models import Base  # Импорт из папки app

target_metadata = Base.metadata

def run_migrations_online():
    from app.database import engine  # Импорт engine
    with engine.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    raise Exception("Offline migrations not supported.")
else:
    run_migrations_online()