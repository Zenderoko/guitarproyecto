import {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus,
} from "transbank-sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const token_ws = req.body?.token_ws || req.query?.token_ws || req.query?.token;

  if (!token_ws) {
    return res.redirect("/pago/failed?error=No+token");
  }

  try {
    const tx = new WebpayPlus.Transaction(
      new Options(
        IntegrationCommerceCodes.WEBPAY_PLUS,
        IntegrationApiKeys.WEBPAY,
        Environment.Integration
      )
    );

    console.log("Committing transaction with token:", token_ws);
    const commitResponse = await tx.commit(token_ws);
    console.log("Commit response:", commitResponse);

    const successUrl = `/pago/success?token=${token_ws}&buyOrder=${commitResponse.buy_order}`;
    const failedUrl = `/pago/failed?error=Pago+rechazado&code=${commitResponse.response_code}`;

    if (commitResponse.response_code === 0) {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Redirigiendo...</title>
            <meta http-equiv="refresh" content="0;url=${successUrl}">
          </head>
          <body>
            <p>Payment successful. Redirecting...</p>
            <script>window.location.href = "${successUrl}";</script>
          </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } else {
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Redirigiendo...</title>
            <meta http-equiv="refresh" content="0;url=${failedUrl}">
          </head>
          <body>
            <p>Payment failed. Redirecting...</p>
            <script>window.location.href = "${failedUrl}";</script>
          </body>
        </html>
      `;
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    const errorMsg = encodeURIComponent(error.message || "Unknown error");
    const errorUrl = `/pago/failed?error=Error+al+procesar&details=${errorMsg}`;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Redirigiendo...</title>
          <meta http-equiv="refresh" content="0;url=${errorUrl}">
        </head>
        <body>
          <p>Error processing payment. Redirecting...</p>
          <script>window.location.href = "${errorUrl}";</script>
        </body>
      </html>
    `;
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}