# CALCIOS Quote Client

Local TypeScript/Node CLI to fetch **buy/sell quotes** for equity tokens via the public StockKit API.

Part of the [CALCIOS](https://calcios.xyz/) ecosystem tooling.  
GitHub organization: [https://github.com/CALCIOS](https://github.com/CALCIOS)

## What it does

- Calls `GET https://api.stockkit.dev/v1/quote` with symbol, side, amount, denom
- Prints effective price, token amount, USD amount, fee tier, venue
- Optional JSON output for scripting
- **No authentication, no keys, no wallet connection**

## Requirements

- Node.js 18+
- npm or pnpm

## Installation

```bash
cd calcios-quote-client
npm install
npm run build
```

## Usage

```bash
# Buy $100 of AAPL (USD denom)
node dist/index.js --symbol AAPL --side buy --amount 100 --denom usd

# Sell 1.5 tokens of TSLA
node dist/index.js --symbol TSLA --side sell --amount 1.5 --denom token

# JSON
node dist/index.js --symbol NVDA --side buy --amount 50 --json
```

## Safety

- Public StockKit endpoint only
- Read-only quote data (does not build or broadcast transactions)
- Safe for public GitHub and local scripts

## License

MIT — see [LICENSE](LICENSE)
