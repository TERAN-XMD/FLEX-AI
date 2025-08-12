FROM node:lts-buster

# Install git (if not already included in base image)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Clone only the root/ikJawad folder from KHAN-MD
RUN git clone --filter=blob:none --no-checkout https://github.com/JawadYT36/KHAN-MD.git temp && \
    cd temp && \
    git sparse-checkout init --cone && \
    git sparse-checkout set root/ikJawad && \
    mv root/ikJawad /root/ikJawad && \
    cd .. && rm -rf temp

WORKDIR /root/ikJawad

RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1

CMD ["pm2-runtime", "index.js"]
