$ErrorActionPreference = "Continue"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $root
$log = Join-Path $root "push-github-log.txt"

Write-Host "=========================================="
Write-Host " English1000 AI Teacher - Push to GitHub"
Write-Host "=========================================="
Write-Host ""
Write-Host "Current folder:"
Write-Host $root
Write-Host ""
Write-Host "Writing log to:"
Write-Host $log
Write-Host ""

& {
  "=========================================="
  "English1000 GitHub push log"
  "Time: $(Get-Date -Format o)"
  "Folder: $root"
  "=========================================="
  ""
  "Git version:"
  git --version
  ""
  "Remote:"
  git remote -v
  ""
  "Status:"
  git status -sb
  ""
  "Push:"
  git push origin main
  ""
  "Exit code: $LASTEXITCODE"
} *>&1 | Tee-Object -FilePath $log

Write-Host ""
Write-Host "If push failed, send Codex a photo of this window or the push-github-log.txt file."
Read-Host "Press Enter to close"
