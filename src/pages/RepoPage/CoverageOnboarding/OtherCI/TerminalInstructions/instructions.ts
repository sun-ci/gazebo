export const windowsSystemInstructions = `#download Codecov CLI
$ProgressPreference = 'SilentlyContinue'
Invoke-WebRequest -Uri https://cli.codecov.io/latest/windows/codecov.exe
-Outfile codecov.exe .\\codecov.exe
`

export const macOSSystemInstructions = `#download Codecov CLI
curl -Os https://cli.codecov.io/latest/macos/codecov
sudo chmod +x codecov
./codecov --help
`

export const linuxSystemInstructions = `#download Codecov CLI
curl -Os https://cli.codecov.io/latest/linux/codecov
sudo chmod +x codecov
`

export const alpineLinuxSystemInstructions = `#download Codecov CLI
curl -Os https://cli.codecov.io/latest/alpine/codecov
sudo chmod +x codecov
./codecov --help
`

export const linuxArm64SystemInstructions = `#download Codecov CLI
curl -Os https://cli.codecov.io/latest/linux-arm64/codecov
sudo chmod +x codecov
`

export const alpineLinuxArm64Instructions = `#download Codecov CLI
curl -Os https://cli.codecov.io/latest/alpine-arm64/codecov
sudo chmod +x codecov
`
