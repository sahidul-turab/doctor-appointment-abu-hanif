Add-Type -AssemblyName System.Drawing
$f1 = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\og-final-refresh.jpg"
$f2 = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\og-final-pro-v5.png"

function Get-Size($p) {
    if (Test-Path $p) {
        $i = [System.Drawing.Image]::FromFile($p)
        Write-Output "$p : $($i.Width)x$($i.Height)"
        $i.Dispose()
    }
    else {
        Write-Output "$p not found"
    }
}

Get-Size $f1
Get-Size $f2
