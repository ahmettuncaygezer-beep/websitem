$result = @()
foreach ($dir in Get-ChildItem -Directory) {
    $stats = Get-ChildItem $dir.FullName -Recurse -File -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum
    $sizeMB = if ($stats.Sum) { [math]::Round($stats.Sum / 1MB, 2) } else { 0 }
    $result += [PSCustomObject]@{ Name = $dir.Name; SizeMB = $sizeMB }
}
Write-Host "--- DIRECTORY SIZES (MB) ---"
$result | Sort-Object SizeMB -Descending | Format-Table -AutoSize

Write-Host "`n--- TOP 20 LARGEST FILES ---"
Get-ChildItem -File -Recurse -ErrorAction SilentlyContinue | Sort-Object Length -Descending | Select-Object -First 20 FullName, @{Name="SizeMB";Expression={[math]::Round($_.Length / 1MB, 2)}} | Format-Table -AutoSize
