# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
# PYTHONDONTWRITEBYTECODE: Prevents Python from writing pyc files to disc
# PYTHONUNBUFFERED: Prevents Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /lmsapi

# Install system dependencies required for MySQL and Python build tools
# - gcc, pkg-config: Required to compile certain Python packages
# - default-libmysqlclient-dev: Required for the mysqlclient Python driver
# - netcat-openbsd: Useful for checking if the database is up before starting (optional)
RUN apt-get update && apt-get install -y \
    gcc \
    pkg-config \
    default-libmysqlclient-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /lmsapi/
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . /lmsapi/

# Collect static files (bundles CSS/JS for production serving)
# Ensure your settings.py has STATIC_ROOT configured
RUN python manage.py collectstatic --noinput

# Expose the port Gunicorn will run on
EXPOSE 8000

# Command to run the application using Gunicorn
# Replace 'tequant_project.wsgi' with your actual project folder name containing wsgi.py
CMD ["gunicorn", "lmsapi.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
