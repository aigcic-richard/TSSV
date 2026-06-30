#!/usr/bin/env bash
# Run verilator --lint-only on every .sv file under sv-examples/.
# Exits 0 if all pass, 1 if any fail.

if ! command -v verilator &>/dev/null; then
  echo "ERROR: verilator not found on PATH"
  exit 1
fi

passed=0
failed=0
failures=()

while IFS= read -r -d '' file; do
  if verilator --lint-only "$file" &>/dev/null; then
    echo "PASS: $file"
    ((passed++))
  else
    echo "FAIL: $file"
    failures+=("$file")
    ((failed++))
  fi
done < <(find sv-examples -name "*.sv" -print0 | sort -z)

echo ""
echo "$passed passed, $failed failed"

if [ ${#failures[@]} -gt 0 ]; then
  echo ""
  echo "Failing files:"
  for f in "${failures[@]}"; do
    echo "  $f"
  done
  exit 1
fi
