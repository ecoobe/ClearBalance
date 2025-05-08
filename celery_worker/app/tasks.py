from celery import Celery

app = Celery('tasks', 
             broker='redis://redis:6379/0',
             include=['app.tasks'])

@app.task
def process_notification():
    return "Notification processed successfully"