import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const token = await generateStreamToken(req.user.id);

    if (!token) {
      return res.status(500).json({ message: "Failed to generate Stream token" });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in getStreamToken controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
