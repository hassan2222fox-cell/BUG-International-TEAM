#!/bin/sh
cd "$(dirname "$0")"
echo "BUG running at http://localhost:8000"
python3 -m http.server 8000
