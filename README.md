## 🚀 Quickstart

### Node.js

*Prerequisites*:
- [Node.js 18+](https://nodejs.org/en/download/)
- [CDP Secret API Key](https://docs.cdp.coinbase.com/get-started/docs/cdp-api-keys#creating-secret-api-keys)
- [OpenAI API Key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

1. Get your agent running:

```bash
# Clone the repository
git clone https://github.com/coinbase/agentkit.git

# Navigate to the root of the repo
cd agentkit

# Install dependencies
npm install

# Build the packages locally
npm run build

# Navigate to the langchain-cdp-chatbot example
cd typescript/examples/langchain-cdp-chatbot

# At this point, fill in your CDP API key name, private key, and OpenAI API key in
# the .env.local file.
# Then, rename the .env.local file to .env
mv .env.local .env

# Run the chatbot
npm run start
```
2. Select "1. chat mode" and start telling your Agent to do things onchain!

```bash
Prompt: Fund my wallet with some testnet ETH.
-------------------
Wallet: ccaf1dbf-3a90-4e52-ad34-89a07aad9e8b on network: base-sepolia with default address: 0xD9b990c7b0079c1c3733D2918Ee50b68f29FCFD5
-------------------

-------------------
Received eth from the faucet. Transaction: https://sepolia.basescan.org/tx/0x03e82934cd04be5b725927729b517c606f6f744611f0f36e834f21ad742ad7ca
-------------------
Your wallet has been successfully funded with testnet ETH. You can view the transaction [here](https://sepolia.basescan.org/tx/0x03e82934cd04be5b725927729b517c606f6f744611f0f36e834f21ad742ad7ca).
-------------------
```

### Docker

*Prerequisites*:
- [Docker installed](https://docs.docker.com/get-docker/)
- [CDP Secret API Key](https://docs.cdp.coinbase.com/get-started/docs/cdp-api-keys#creating-secret-api-keys)
- [OpenAI API Key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

1. Pull the Docker image:

```bash
docker pull rohitshukla556/agentic-ethereum
```

2. Run the container with the necessary environment variables:

```bash
docker run --rm -it \
  -e CDP_API_KEY=<your_cdp_api_key> \
  -e CDP_PRIVATE_KEY=<your_cdp_private_key> \
  -e OPENAI_API_KEY=<your_openai_api_key> \
  rohitshukla556/agentic-ethereum
```

3. Follow the on-screen instructions to interact with the agent.

Enjoy using your agent with Docker! 🚀

