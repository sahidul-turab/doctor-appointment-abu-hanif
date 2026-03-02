Add-Type -AssemblyName System.Drawing

$bgFile = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\og-final-refresh.jpg"
$portraitFile = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\doctor-portrait.png"
$outputFile = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\og-composite-v7.png"

$width = 1200
$height = 630

$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# 1. Background Fill
$bgColor = [System.Drawing.ColorTranslator]::FromHtml('#0f172a')
$bgBrush = New-Object System.Drawing.SolidBrush($bgColor)
$g.FillRectangle($bgBrush, 0, 0, $width, $height)

# 2. Add Medical Backdrop
if (Test-Path $bgFile) {
    $bgImg = [System.Drawing.Image]::FromFile($bgFile)
    $g.DrawImage($bgImg, 0, 0, $width, $height)
    $bgImg.Dispose()
}

# 3. Soft Dark Tint
$tintColor = [System.Drawing.Color]::FromArgb(160, 15, 23, 42)
$tintBrush = New-Object System.Drawing.SolidBrush($tintColor)
$g.FillRectangle($tintBrush, 0, 0, $width, $height)

# 4. Portrait
if (Test-Path $portraitFile) {
    $port = [System.Drawing.Image]::FromFile($portraitFile)
    $g.DrawImage($port, 80, 105, 420, 420)
    $port.Dispose()
}

# 5. Text Contents (Unicode escapes for Bengali)
$nameStr = [char]0x09A1 + [char]0x09BE + [char]0x002E + [char]0x0020 + [char]0x0986 + [char]0x09AC + [char]0x09C1 + [char]0x0020 + [char]0x09B9 + [char]0x09BE + [char]0x09A8 + [char]0x09BF + [char]0x09AB
$engStr = "Cardiologist"
$subStr = [char]0x0028 + [char]0x09B9 + [char]0x09C3 + [char]0x09A6 + [char]0x09B0 + [char]0x09CB + [char]0x0997 + [char]0x0020 + [char]0x09AC + [char]0x09BF + [char]0x09B7 + [char]0x09C7 + [char]0x09B7 + [char]0x099C + [char]0x09CD + [char]0x099E + [char]0x0029

$fontName = New-Object System.Drawing.Font("Nirmala UI", 56, [System.Drawing.FontStyle]::Bold)
$fontEng = New-Object System.Drawing.Font("Nirmala UI", 28, [System.Drawing.FontStyle]::Regular)
$fontSub = New-Object System.Drawing.Font("Nirmala UI", 32, [System.Drawing.FontStyle]::Bold)

$blueColor = [System.Drawing.ColorTranslator]::FromHtml('#3b82f6')
$blueBrush = New-Object System.Drawing.SolidBrush($blueColor)
$lightBlueColor = [System.Drawing.ColorTranslator]::FromHtml('#60a5fa')
$lightBlueBrush = New-Object System.Drawing.SolidBrush($lightBlueColor)

# Rendering
$g.DrawString($nameStr, $fontName, [System.Drawing.Brushes]::White, 560, 180)
$g.DrawString($engStr, $fontEng, $lightBlueBrush, 560, 290)
$g.DrawString($subStr, $fontSub, $blueBrush, 560, 335)

# Save
$bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Output "OG Composite v7 Success - UTF Fix Applied"