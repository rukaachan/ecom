import { Xendit } from "xendit-node";

const secretKey = process.env.XENDIT_SECRET_KEY;
if (!secretKey) {
  throw new Error("XENDIT_SECRET_KEY is required");
}

const xendit = new Xendit({
  secretKey,
});

export default xendit;
