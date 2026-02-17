"use server";

import { schemaShippingAddress } from "@/lib/schema";
import { getUser } from "@/lib/auth";
import { generateRandomString } from "@/lib/utils";
import { ActionResult, TCart } from "@/type";
import { redirect } from "next/navigation";
import prisma from "../../../../../../lib/prisma";
import xendit from "@/lib/xendit";
import type { PaymentRequest, PaymentRequestParameters } from "xendit-node/payment_request/models";

export async function storeOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[]
): Promise<ActionResult> {
  const { session, user } = await getUser();

  if (!session || !user) {
    return redirect("/");
  }

  const parse = schemaShippingAddress.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    postal_code: formData.get("postal_code"),
    city: formData.get("city"),
    notes: formData.get("notes"),
    phone: formData.get("phone"),
  });

  if (!parse.success) {
    return {
      error: parse.error.errors[0].message,
    };
  }

  let redirectPaymentUrl = "/";

  if (products.length === 0) {
    return {
      error: "Your cart is empty",
    };
  }

  const [primaryProduct] = products;

  try {
    const order = await prisma.order.create({
      data: {
        total: BigInt(total),
        status: "pending",
        user_id: user.id,
        product_id: primaryProduct.id,
        code: generateRandomString(15),
      },
    });

    const data: PaymentRequestParameters = {
      amount: total,
      currency: "IDR",
      referenceId: order.code,
      paymentMethod: {
        type: "EWALLET",
        reusability: "ONE_TIME_USE",
        ewallet: {
          channelCode: "SHOPEEPAY",
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL ?? "",
            failureReturnUrl: process.env.NEXT_PUBLIC_FAILURE_RETURN_URL ?? "",
          },
        },
      },
    };

    const response: PaymentRequest = await xendit.PaymentRequest.createPaymentRequest({
      data,
    });

    redirectPaymentUrl = response.actions?.find((val) => val.urlType === "DEEPLINK")?.url ?? "/";

    const queryCreateProductOrder = products.map((product) => ({
      order_id: order.id,
      product_id: product.id,
      quantity: product.quantity,
      subTotal: BigInt(product.price * product.quantity),
    }));

    await prisma.orderDetail.create({
      data: {
        address: parse.data.address,
        city: parse.data.city,
        name: parse.data.name,
        phone: parse.data.phone,
        postal_code: parse.data.postal_code,
        notes: parse.data.notes,
        order_id: order.id,
      },
    });

    await prisma.orderProduct.createMany({
      data: queryCreateProductOrder,
    });
  } catch {
    return {
      error: "Failed to checkout",
    };
  }

  return redirect(redirectPaymentUrl);
}
