#!/usr/bin/env bash
set -euo pipefail

echo "WarehousePro ERP Kit - basic file check"

test -f backend/composer.json
test -f backend/routes/api.php
test -f frontend/package.json
test -f frontend/src/App.tsx


echo "OK: project structure looks good."
