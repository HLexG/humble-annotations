# Use the official Debian image
FROM ubuntu:18.04

ARG DEBIAN_PACKAGES="build-essential git golang-go"

# Prevent apt from showing prompts
ENV DEBIAN_FRONTEND=noninteractive

# Ensure we have an up to date baseline, install dependencies and
# create a user so we don't run the app as root
RUN set -ex; \
    for i in $(seq 1 8); do mkdir -p "/usr/share/man/man${i}"; done && \
    apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends $DEBIAN_PACKAGES && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    pip install --no-cache-dir --upgrade pip && \
    pip install pipenv && \
    useradd -ms /bin/bash app -d /home/app -u 1000 -p "$(openssl passwd -1 Passw0rd)" && \
    mkdir -p /app && \
    chown app:app /app

# Expose the PostgreSQL port
EXPOSE 5432

# Switch to the new user
USER app
WORKDIR /app

# Add the app folder
ADD --chown=app:app . /app

# Entry point
ENTRYPOINT ["/bin/bash"]