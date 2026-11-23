# Downloads all 17 images from the current TylerStorage.com site into the "images" folder next to this script.
# Run it: right-click this file > "Run with PowerShell"
$ErrorActionPreference = 'Stop'
$dest = Join-Path $PSScriptRoot 'images'
New-Item -ItemType Directory -Force -Path $dest | Out-Null
$base = 'https://www.tylerstorage.com/dev/wp-content/uploads/'
$files = @(
 '2015/07/logo.png','2015/08/pay-button.jpg','2017/10/Footer-icons-e1638468305756.jpg','2015/08/tmsa.jpg',
 '2021/11/IMG_6757.jpg','2021/11/IMG_6739-1.jpg','2021/11/IMG_6737-1.jpg','2021/11/IMG_6741-scaled.jpg',
 '2021/11/IMG_6760.jpg','2021/11/IMG_6728-1.jpg','2015/07/header1.jpg','2015/07/IMG_2984a1.jpg',
 '2015/07/IMG_2989.jpg','2015/07/header3.jpg','2015/07/header11.jpg','2015/07/AG.jpg','2015/07/header4-copy.jpg'
)
foreach ($f in $files) {
  $name = 'tylerstorage_' + ($f -split '/')[-1]
  Write-Host "Downloading $name"
  Invoke-WebRequest -Uri ($base + $f) -OutFile (Join-Path $dest $name) -UseBasicParsing
}
Remove-Item (Join-Path $dest 'PUT-IMAGES-HERE.txt') -ErrorAction SilentlyContinue
Write-Host "Done: $((Get-ChildItem $dest).Count) images saved to $dest"
Read-Host 'Press Enter to close'
