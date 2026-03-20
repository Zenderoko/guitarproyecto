import { WebpayPlus, IntegrationApiKeys, IntegrationCommerceCodes } from "transbank-sdk";

const generateBuyOrder = () => {
  return `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};

const getBaseUrl = (req) => {
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  if (req?.headers?.host) {
    return `http://${req.headers.host}`;
  }
  return "http://localhost:3000";
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Monto inválido" });
    }

    const tx = WebpayPlus.Transaction.buildForIntegration(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY
    );

    const buyOrder = generateBuyOrder();
    const sessionId = `session-${Date.now()}`;
    const baseUrl = getBaseUrl(req);
    const returnUrl = `${baseUrl}/api/pago/response`;

    console.log("Creating transaction:");
    console.log("- buyOrder:", buyOrder);
    console.log("- sessionId:", sessionId);
    console.log("- amount:", amount);
    console.log("- returnUrl:", returnUrl);

    const createResponse = await tx.create(buyOrder, sessionId, amount, returnUrl);

    console.log("Transbank response:", JSON.stringify(createResponse, null, 2));

    if (createResponse) {
      const token = createResponse.token || createResponse.token_ws;
      const url = createResponse.url;

      if (token && url) {
        return res.status(200).json({
          url,
          token,
        });
      }
    }

    throw new Error("Respuesta inválida de Transbank: " + JSON.stringify(createResponse));
  } catch (error) {
    console.error("Error al crear transacción:", error);
    return res.status(500).json({
      error: "Error al procesar el pago",
      details: error.message,
    });
  }
}