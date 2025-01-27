# Stage 1: Builder
FROM ubuntu:latest AS builder

# Install curl and other necessary tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    ca-certificates \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

# Install Node.js
# installs nvm (Node Version Manager)
# RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# download and install Node.js (you may need to restart the terminal)

# RUN export NVM_DIR="~/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  && [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" 
# RUN nvm install 20
# # verifies the right Node.js version is in the environment
# RUN node -v

# Install Dagger.io
RUN curl -L https://dl.dagger.io/dagger/install.sh | sh

# Install Rust
# RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y --profile minimal --default-toolchain stable

# COPY ../entrypoint.sh /entrypoint.sh

# Stage 2: Final image
FROM ubuntu:latest

# Copy Deno, Dagger & rust from builder stage
COPY --from=builder /root/.deno /root/.deno
COPY --from=builder /usr/bin/dagger /usr/bin/dagger
# COPY --from=builder "/~/.nvm" "/root/.nvm"
# Copy Rust binaries from builder stage
# COPY --from=builder /root/.cargo /root/.cargo
# COPY --from=builder /entrypoint.sh /entrypoint.sh

# Copy Docker CLI from docker:dind
COPY --from=docker:dind /usr/local/bin/docker /usr/local/bin/docker
# RUN source "$HOME/.cargo/env"
# Set up environment variables
# ENV DENO_INSTALL="/root/.deno" \
#     PATH="/root/.deno/bin:/usr/local/bin:/root/.cargo/bin:$PATH"

ENV DENO_INSTALL="/root/.deno" \
    # NVM_DIR="/root/.nvm" \
    PATH="/root/.deno/bin:/usr/local/bin:$PATH"

# Install minimal runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    git \
    && rm -rf /var/lib/apt/lists/*


# Set working directory
WORKDIR /app

# Copy application files
COPY . .

RUN echo '#!/bin/sh' > /startup.sh && \
    echo 'echo "Container started at $(date)"' >> /startup.sh && \
    echo 'echo "Deno version: $(deno --version)"' >> /startup.sh && \
    echo 'echo "Dagger version: $(dagger version)"' >> /startup.sh && \
    # echo 'echo "Rust version: $(rustc --version)"' >> /startup.sh && \
    echo 'echo "Docker version: $(docker --version)"' >> /startup.sh && \
    echo 'echo "Git version: $(git --version)"' >> /startup.sh && \
    echo 'echo "Ready to use!"' >> /startup.sh && \
    echo 'exec "$@"' >> /startup.sh && \
    chmod +x /startup.sh


# RUN bash -c 'source $HOME/.cargo/env && rustup default stable && rustc --version'
# Set the entrypoint to the script
# ENTRYPOINT ["/entrypoint.sh"]

# Expose port for the application
EXPOSE 8000

# Default command
CMD ["/bin/bash"]