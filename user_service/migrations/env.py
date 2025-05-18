from alembic import context
from app.models import Base  # Импорт вашей модели

target_metadata = Base.metadata

def run_migrations_online():
    connectable = context.config.attributes.get("connection", None)
    if connectable is None:
        from app.database import engine
        connectable = engine

    with connectable.connect() as connection:
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