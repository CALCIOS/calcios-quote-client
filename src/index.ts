#!/usr/bin/env node
/**
 * CALCIOS Quote Client — public StockKit quote CLI.
 * No credentials. Local / client-side only.
 */

const STOCKKIT = "https://api.stockkit.dev/v1";

type Quote = {
  symbol: string;
  side: string;
  feeTier?: number;
  usdAmount?: string;
  tokenAmount?: string;
  effectivePricePerToken?: string;
  gasEstimate?: string;
  venue?: string;
  pair?: string;
};

function parseArgs(argv: string[]) {
  const out: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--json") out.json = true;
    else if (a.startsWith("--") && i + 1 < argv.length) {
      out[a.slice(2)] = argv[++i];
    }
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const symbol = String(args.symbol || "").toUpperCase();
  const side = String(args.side || "buy").toLowerCase();
  const amount = String(args.amount || "");
  const denom = String(args.denom || "usd").toLowerCase();

  if (!symbol || !amount) {
    console.error(
      "Usage: calcios-quote --symbol AAPL --side buy --amount 100 [--denom usd|token] [--json]"
    );
    process.exit(1);
  }
  if (!["buy", "sell"].includes(side)) {
    console.error("side must be buy or sell");
    process.exit(1);
  }

  const q = new URLSearchParams({ symbol, side, amount, denom });
  const url = `${STOCKKIT}/quote?${q.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    console.error(`StockKit error ${res.status}: ${text.slice(0, 300)}`);
    process.exit(1);
  }
  const data = (await res.json()) as Quote;

  if (args.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.log(`Symbol:   ${data.symbol}`);
  console.log(`Side:     ${data.side}`);
  console.log(`USD:      ${data.usdAmount ?? "n/a"}`);
  console.log(`Tokens:   ${data.tokenAmount ?? "n/a"}`);
  console.log(`Price:    ${data.effectivePricePerToken ?? "n/a"}`);
  console.log(`Fee tier: ${data.feeTier ?? "n/a"}`);
  console.log(`Venue:    ${data.venue ?? "n/a"}`);
  if (data.gasEstimate) console.log(`Gas est:  ${data.gasEstimate}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
