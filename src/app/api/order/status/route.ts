import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

type XenditWebhookPayload = {
  event?: string;
  reference_id?: string;
  referenceId?: string;
  status?: string;
  data?: {
    reference_id?: string;
    referenceId?: string;
    status?: string;
  };
};

export async function POST(request: Request) {
  const callbackToken = request.headers.get("x-callback-token");
  const expectedCallbackToken = process.env.XENDIT_WEBHOOK_CALLBACK_TOKEN;

  if (expectedCallbackToken && callbackToken !== expectedCallbackToken) {
    return NextResponse.json({ error: "Unauthorized webhook request" }, { status: 401 });
  }

  const body = (await request.json()) as XenditWebhookPayload;

  if (body.event && body.event !== "payment.succeeded") {
    return NextResponse.json({ success: true, ignored: true, reason: "Unsupported event type" });
  }

  const code =
    body.reference_id ?? body.referenceId ?? body.data?.reference_id ?? body.data?.referenceId;

  if (!code) {
    return NextResponse.json({ error: "Missing reference_id" }, { status: 400 });
  }

  const xenditStatus = body.status ?? body.data?.status;
  const nextStatus = xenditStatus === "SUCCEEDED" ? "delivered" : "cancelled";

  try {
    const result = await prisma.order.updateMany({
      where: { code },
      data: { status: nextStatus },
    });

    if (result.count === 0) {
      return NextResponse.json({
        success: true,
        matched: false,
        message: "No order matched reference_id",
      });
    }
  } catch {
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
