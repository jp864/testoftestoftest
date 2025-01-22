import os
from flask import Flask, jsonify
from flask_cors import CORS
import requests

# Create the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Dedicated RPC endpoint (replace with your QuickNode endpoint)
SOLANA_RPC_URL = os.getenv('SOLANA_RPC_URL', 'https://mainnet.helius-rpc.com/?api-key=default-key')
# SPL Token Program ID (fixed for all SPL tokens)
SPL_TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"

TOKEN_MINT_ADDRESS = os.getenv('TOKEN_MINT_ADDRESS', 'HEVdGAtwUitQMjw2VdecjZWpdPfRLUVHiDvHpWupump')

# Fetch all token accounts for a specific mint
def fetch_token_accounts(mint_address):
    payload = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "getProgramAccounts",
        "params": [
            SPL_TOKEN_PROGRAM_ID,
            {
                "encoding": "jsonParsed",
                "filters": [
                    {"dataSize": 165},  # Filter for token accounts (size of a token account)
                    {
                        "memcmp": {
                            "offset": 0,  # Mint address is at the start of the account data
                            "bytes": mint_address  # Filter by mint address
                        }
                    }
                ]
            }
        ]
    }
    response = requests.post(SOLANA_RPC_URL, json=payload)
    return response.json()

# Route to fetch the holder count and list of holders
@app.route('/holder-count', methods=['GET'])
def get_holder_count():
    try:
        # Fetch token accounts for the mint
        token_accounts = fetch_token_accounts(TOKEN_MINT_ADDRESS)
        print("Raw response from Solana RPC:", token_accounts)  # Debugging: Print the raw response

        # Extract unique owners and their balances
        holders = {}
        for account in token_accounts.get('result', []):
            owner = account['account']['data']['parsed']['info']['owner']
            balance = int(account['account']['data']['parsed']['info']['tokenAmount']['amount'])

            # If the owner already exists in the dictionary, add to their balance
            if owner in holders:
                holders[owner] += balance
            else:
                holders[owner] = balance

        # Filter out holders with a balance of 0
        active_holders = {owner: balance for owner, balance in holders.items() if balance > 0}

        # Return the holder count and list of holders
        return jsonify({
            "success": True,
            "count": len(active_holders),
            "holders": list(active_holders.keys())  # Return the list of active holders
        })

    except Exception as e:
        # Handle errors
        return jsonify({
            "success": False,
            "error": f"An unexpected error occurred: {str(e)}"
        }), 500

# Create a function to return the Flask app (for waitress-serve)
def create_app():
    return app

# Run the Flask app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)