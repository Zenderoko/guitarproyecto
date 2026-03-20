import { WebpayPlus, IntegrationApiKeys, IntegrationCommerceCodes } from "transbank-sdk";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const rawBody = await readBody(req);
  let token_ws = rawBody?.token_ws || req.query?.token_ws || req.query?.token;

  if (!token_ws) {
    console.log("No token found in request");
    return res.redirect("/pago/failed?error=No+token");
  }

  console.log("Token received:", token_ws);

  try {
    const tx = WebpayPlus.Transaction.buildForIntegration(
      IntegrationCommerceCodes.WEBPAY_PLUS,
      IntegrationApiKeys.WEBPAY
    );

    console.log("Committing transaction with token:", token_ws);
    const commitResponse = await tx.commit(token_ws);
    console.log("Commit response:", JSON.stringify(commitResponse, null, 2));

    const buyOrder = commitResponse.buy_order || "";
    const responseCode = commitResponse.response_code;
    const status = commitResponse.status;

    const successUrl = `/pago/success?token=${token_ws}&buyOrder=${encodeURIComponent(buyOrder)}&responseCode=${responseCode}`;
    const failedUrl = `/pago/failed?error=Pago+rechazado&code=${responseCode}&status=${encodeURIComponent(status || "")}`;

    if (responseCode === 0 || status === "AUTHORIZED") {
      const html = generateRedirectHtml(successUrl, "Pago exitoso. Redirigiendo...");
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    } else {
      const html = generateRedirectHtml(failedUrl, "Pago rechazado. Redirigiendo...");
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }
  } catch (error) {
    console.error("Error al confirmar transacción:", error);
    const errorMsg = encodeURIComponent(error.message || "Unknown error");
    const errorUrl = `/pago/failed?error=Error+al+procesar&details=${errorMsg}`;
    const html = generateRedirectHtml(errorUrl, "Error procesando pago. Redirigiendo...");
    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  }
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        if (data) {
          const contentType = req.headers["content-type"] || "";
          if (contentType.includes("application/x-www-form-urlencoded")) {
            const params = new URLSearchParams(data);
            const result = {};
            for (const [key, value] of params) {
              result[key] = value;
            }
            resolve(result);
          } else {
            resolve(JSON.parse(data));
          }
        } else {
          resolve({});
        }
      } catch (e) {
        resolve({});
      }
    });
    req.on("error", reject);
  });
}

function generateRedirectHtml(url, message) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirigiendo...</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <p>${message}</p>
        <script>
          window.location.href = "${url}";
        </script>
      </body>
    </html>
  `;
}