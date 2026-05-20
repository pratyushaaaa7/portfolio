# Run the portfolio without npm on PATH (uses Cursor's Node or Program Files Node)
$nodeCandidates = @(
  "$env:ProgramFiles\nodejs\node.exe",
  "$env:LOCALAPPDATA\Programs\node\node.exe",
  "$env:USERPROFILE\scoop\apps\nodejs\current\node.exe",
  "$env:LOCALAPPDATA\Programs\cursor\resources\app\resources\helpers\node.exe"
)

$node = $nodeCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $node) {
  Write-Host "Node.js not found. Install from https://nodejs.org/ (LTS), then reopen the terminal." -ForegroundColor Red
  exit 1
}

Set-Location $PSScriptRoot

# Stop stale Next.js dev servers (broken .next cache on port 3000 causes 500 errors)
foreach ($port in 3000, 3001) {
  $listeners = netstat -ano 2>$null | Select-String ":$port\s+.*LISTENING"
  foreach ($line in $listeners) {
    $procId = ($line -split '\s+')[-1]
    if ($procId -match '^\d+$') {
      Stop-Process -Id ([int]$procId) -Force -ErrorAction SilentlyContinue
    }
  }
}

if (Test-Path ".\.next") {
  Write-Host "Clearing .next cache..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force ".\.next"
}

Write-Host "Using: $node" -ForegroundColor Cyan
Write-Host "Open http://localhost:3000" -ForegroundColor Green
& $node ".\node_modules\next\dist\bin\next" dev
