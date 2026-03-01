Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

# Configuration
$outputFile = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\og-centered-v6.png"
$portraitFile = "e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\public\doctor-portrait.png"
$width = 1200
$height = 630
$bg_color = [System.Drawing.ColorTranslator]::FromHtml('#0f172a') # Deep Navy

# Create Bitmap
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Draw Background
$brush = New-Object System.Drawing.SolidBrush($bg_color)
$g.FillRectangle($brush, 0, 0, $width, $height)

# Load and Draw Portrait (Left Side)
if (Test-Path $portraitFile) {
    $portrait = [System.Drawing.Image]::FromFile($portraitFile)
    
    # Target size for portrait (with padding)
    $targetPortW = 450
    $targetPortH = 450
    $posX = 80
    $posY = ($height - $targetPortH) / 2
    
    # Draw a rounded white glow box behind portrait
    $glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(20, [System.Drawing.Color]::White))
    $g.FillEllipse($glowBrush, $posX - 40, $posY - 40, $targetPortW + 80, $targetPortH + 80)
    
    $g.DrawImage($portrait, $posX, $posY, $targetPortW, $targetPortH)
    $portrait.Dispose()
}

# Draw Text (Right Side)
$textX = 600
$textY = 180

# Font Selection
$fontTitle = New-Object System.Drawing.Font("Nirmala UI", 60, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Nirmala UI", 32, [System.Drawing.FontStyle]::Regular)
$whiteBrush = [System.Drawing.Brushes]::White
$blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#3b82f6'))

# Render Bengali Name
$g.DrawString("ডা. আবু হানিফ", $fontTitle, $whiteBrush, $textX, $textY)

# Render Specialization
$g.DrawString("Cardiologist", $fontSub, $blueBrush, $textX, $textY + 120)
$g.DrawString("(হৃদরোগ বিশেষজ্ঞ)", $fontSub, $blueBrush, $textX, $textY + 180)

# Save Final Image
$bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$g.Dispose()
$bmp.Dispose()
Write-Output "Image generated and saved to $outputFile"
