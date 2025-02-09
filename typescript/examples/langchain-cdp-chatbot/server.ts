import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Chatbot } from "./chatbot";
import { v4 as uuidv4 } from "uuid";
import { EvmWalletProvider } from "./wallet-providers";
import { encodeFunctionData, Hex } from "viem";
import { WETH_ABI, WETH_ADDRESS } from "./constants";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatbot = new Chatbot();
const walletProvider = new EvmWalletProvider();

app.get("/", (req, res) => {
    res.send("Chatbot API is running!");
});

// API to send a message to the chatbot
app.post("/chat", async (req, res) => {
    try {
        const { userId, message } = req.body;
        if (!userId || !message) {
            return res.status(400).json({ error: "Missing userId or message" });
        }

        const response = await chatbot.getResponse(userId, message);
        res.json({ response });
    } catch (error) {
        console.error("Error in chatbot response:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API to start a new chatbot session
app.post("/start", (req, res) => {
    try {
        const userId = uuidv4();
        chatbot.startSession(userId);
        res.json({ userId, message: "New chatbot session started" });
    } catch (error) {
        console.error("Error starting chatbot session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API to end a chatbot session
app.post("/end", (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        chatbot.endSession(userId);
        res.json({ message: "Chatbot session ended" });
    } catch (error) {
        console.error("Error ending chatbot session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API to wrap ETH to WETH
app.post("/wrap-eth", async (req, res) => {
    try {
        const { amount } = req.body;
        if (!amount) {
            return res.status(400).json({ error: "Missing amount" });
        }

        const hash = await walletProvider.sendTransaction({
            to: WETH_ADDRESS as Hex,
            data: encodeFunctionData({
                abi: WETH_ABI,
                functionName: "deposit",
            }),
            value: BigInt(amount),
        });

        await walletProvider.waitForTransactionReceipt(hash);

        res.json({ message: "Wrapped ETH successfully", transactionHash: hash });
    } catch (error) {
        console.error("Error wrapping ETH:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
