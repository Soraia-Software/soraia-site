// Web search + fetch for the content authors, so every external fact links a source the model
// actually opened (system prompts: "link the sources"). Same tools and pause_turn loop as
// topic-radar.mjs; the JSON answer is the text after the last tool result.

export const WEB_TOOLS = [
  { type: "web_search_20260209", name: "web_search" },
  { type: "web_fetch_20260209", name: "web_fetch" },
];

export const SOURCES_INSTRUCTION = [
  "SOURCES: before writing, use web_search to find the official source of every external fact you state",
  "(a law, an article, a deadline, a threshold, a statistic) and open it with web_fetch. Link those sources",
  "in BOTH languages (2-4 in an article or a guide, where they fit in a comparison), and only URLs you opened",
  "that support the sentence. Prefer EUR-Lex, Normattiva, Gazzetta Ufficiale, ministries and EU agencies,",
  "ISTAT, Banca d'Italia, standards bodies and official vendor documentation; never aggregators, consultants'",
  "blogs or competitors. A fact you cannot source this way is cut. When the research is done, answer with",
  "the JSON only.",
].join(" ");

/** messages.create with the web tools, resuming on pause_turn (at most 8 rounds). */
export async function createWithWebTools(client, params, user) {
  const messages = [{ role: "user", content: user }];
  let resp, guard = 0;
  do {
    resp = await client.messages.create({ ...params, tools: WEB_TOOLS, messages });
    if (resp.stop_reason === "pause_turn") messages.push({ role: "assistant", content: resp.content });
  } while (resp.stop_reason === "pause_turn" && ++guard < 8);
  return resp;
}

/** The final answer: text after the last tool result (earlier text narrates the research). */
export function textAfterTools(resp) {
  const text = (blocks) => blocks.filter((b) => b.type === "text").map((b) => b.text).join("");
  const last = resp.content.findLastIndex((b) => b.type.endsWith("_tool_result"));
  const tail = text(resp.content.slice(last + 1));
  return tail.includes("{") ? tail : text(resp.content);
}
