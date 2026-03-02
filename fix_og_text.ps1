# Create the script as a UTF8 string
$script = @'
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
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# 1. Start with the Dark Navy background
$brushBg = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#0a1122'))
$g.FillRectangle($brushBg, 0, 0, $width, $height)

# 2. Draw the medical backdrop (og-final-refresh.jpg)
# We draw it centered to provide the stethoscope and medical rhythm texture
if (Test-Path $bgFile) {
    $bgImg = [System.Drawing.Image]::FromFile($bgFile)
    # Fit it into the 1200x630 canvas
    $ratio = [Math]::Max($width / $bgImg.Width, $height / $bgImg.Height)
    $newW = $bgImg.Width * $ratio
    $newH = $bgImg.Height * $ratio
    $g.DrawImage($bgImg, ($width - $newW)/2, ($height - $newH)/2, $newW, $newH)
    $bgImg.Dispose()
}

# 3. Add a semi-transparent overlay to clear the center area for NEW text/photo 
# (This prevents the "double background" / messy text look)
$overlayBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(180, 10, 17, 34))
$g.FillRectangle($overlayBrush, 0, 0, $width, $height)

# 4. Draw Doctor Portrait (Left Side)
if (Test-Path $portraitFile) {
    $pImg = [System.Drawing.Image]::FromFile($portraitFile)
    $pSize = 420
    # Add a subtle glow behind portrait
    $g.FillEllipse([System.Drawing.Brushes]::Transparent, 100, 105, 420, 420)
    $g.DrawImage($pImg, 80, ($height - $pSize)/2, $pSize, $pSize)
    $pImg.Dispose()
}

# 5. Draw Info Text (Right Side)
# Using Nirmala UI - Standard Windows font for Bengali
$fontName = New-Object System.Drawing.Font("Nirmala UI", 56, [System.Drawing.FontStyle]::Bold)
$fontSub = New-Object System.Drawing.Font("Nirmala UI", 36, [System.Drawing.FontStyle]::Bold)
$fontEng = New-Object System.Drawing.Font("Nirmala UI", 28, [System.Drawing.FontStyle]::Regular)

$textX = 580
$textY = 180

# The text we want
$name = "ডা. আবু হানিফ"
$eng = "Cardiologist"
$bnSub = "(হৃদরোগ বিশেষজ্ঞ)"

$g.DrawString($name, $fontName, [System.Drawing.Brushes]::White, $textX, $textY)
$g.DrawString($eng, $fontEng, New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#60a5fa')), $textX, $textY + 110)
$g.DrawString($bnSub, $fontSub, New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml('#3b82f6')), $textX, $textY + 160)

# Save as PNG
$bmp.Save($outputFile, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
'@

# Save the script with UTF8 + BOM to handle Bengali correctly
[IO.File]::WriteAllText("e:\doctor-appointment-abu-hanif-main\doctor-appointment-abu-hanif-main\tmp_generate_v7.ps1", $script, [System.Text.Encoding]::UTF8)
