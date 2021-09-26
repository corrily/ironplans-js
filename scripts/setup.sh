#!/usr/bin/env bash

isMacOS() {
  [[ $OSTYPE == "darwin"* ]]
}

if ! isMacOS; then
  echo "This script is only for MacOS"
  exit 1
fi

brewCmds=("shellcheck" "shfmt")

echo "⏳ Updating brew"
brew update >/dev/null
outdated=$(brew outdated --formula)

for cmd in "${brewCmds[@]}"; do
  if ! brew list "$cmd" >/dev/null; then
    echo "⏳ Installing $cmd"
    brew install "$cmd"
    echo "✅ Done"
  else
    if [[ $outdated == *"$cmd"* ]]; then
      echo "⏳ Updating $cmd"
      brew upgrade "$cmd"
      echo "✅ Done"
    fi
    echo "✅ $cmd is already installed"
  fi
done
