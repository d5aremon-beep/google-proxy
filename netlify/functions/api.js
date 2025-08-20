const fetch = require("node-fetch");

// 🔹 Ton URL Google Apps Script déployée
const GOOGLE_API_URL = "https://script.google.com/macros/s/AKfycbyC6IQE6FrUnBcWQTLsaPb_vQKNQDLgvsM8IcNYOkeEWtqjHnK5txG3J_ptvlXFyXh4_w/exec";

exports.handler = async function(event, context) {
  try {
    const url = new URL(event.rawUrl);
    const sheet = url.searchParams.get("sheet"); // "entries" ou "settings"

    if (!sheet) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Paramètre 'sheet' requis" })
      };
    }

    // --- GET ---
    if (event.httpMethod === "GET") {
      const response = await fetch(`${GOOGLE_API_URL}?sheet=${sheet}`);
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      };
    }

    // --- POST ---
    if (event.httpMethod === "POST") {
      const response = await fetch(`${GOOGLE_API_URL}?sheet=${sheet}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: event.body
      });
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non supportée" })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};

      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
