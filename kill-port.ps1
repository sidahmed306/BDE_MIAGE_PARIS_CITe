# Script PowerShell pour tuer un processus sur un port spécifique
param(
    [int]$Port = 4000
)

Write-Host "🔍 Recherche du processus utilisant le port $Port..." -ForegroundColor Yellow

$process = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique

if ($process) {
    $processInfo = Get-Process -Id $process -ErrorAction SilentlyContinue
    if ($processInfo) {
        Write-Host "📌 Processus trouvé:" -ForegroundColor Cyan
        Write-Host "   PID: $($processInfo.Id)" -ForegroundColor White
        Write-Host "   Nom: $($processInfo.ProcessName)" -ForegroundColor White
        Write-Host "   Chemin: $($processInfo.Path)" -ForegroundColor White
        
        $confirm = Read-Host "❓ Voulez-vous arrêter ce processus? (O/N)"
        if ($confirm -eq 'O' -or $confirm -eq 'o' -or $confirm -eq 'Y' -or $confirm -eq 'y') {
            Stop-Process -Id $process -Force
            Write-Host "✅ Processus arrêté avec succès!" -ForegroundColor Green
        } else {
            Write-Host "❌ Opération annulée" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  Processus introuvable ou déjà terminé" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Aucun processus n'utilise le port $Port" -ForegroundColor Green
}

