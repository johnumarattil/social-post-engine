#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKING_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
NODE_BIN="$(dirname "$(which node)")"
SYSTEMD_USER_DIR="$HOME/.config/systemd/user"

echo "Installing autopublish systemd units..."
echo "  Working directory: $WORKING_DIR"
echo "  Node bin:          $NODE_BIN"

mkdir -p "$SYSTEMD_USER_DIR"

# Generate service files from templates by replacing placeholders
for template in "$SCRIPT_DIR"/*.service.template; do
  service_name="$(basename "$template" .template)"
  sed \
    -e "s|__WORKING_DIR__|$WORKING_DIR|g" \
    -e "s|__NODE_BIN__|$NODE_BIN|g" \
    "$template" > "$SYSTEMD_USER_DIR/$service_name"
  echo "  Installed $service_name"
done

# Copy timer files
for timer in "$SCRIPT_DIR"/*.timer; do
  cp "$timer" "$SYSTEMD_USER_DIR/"
  echo "  Installed $(basename "$timer")"
done

echo "Reloading systemd daemon..."
systemctl --user daemon-reload

echo "Enabling and starting LinkedIn timers..."
systemctl --user enable autopublish.timer
systemctl --user start autopublish.timer
systemctl --user enable autopublish-afternoon.timer
systemctl --user start autopublish-afternoon.timer
systemctl --user enable autopublish-evening.timer
systemctl --user start autopublish-evening.timer

echo "Enabling and starting Instagram timers..."
systemctl --user enable autopublish-instagram-morning.timer
systemctl --user start autopublish-instagram-morning.timer
systemctl --user enable autopublish-instagram-evening.timer
systemctl --user start autopublish-instagram-evening.timer

echo "Enabling linger (keeps timers running when logged out)..."
loginctl enable-linger "$(whoami)"

echo ""
echo "Done! Active timers:"
systemctl --user list-timers 'autopublish*'
echo ""
echo "LinkedIn manual trigger:   systemctl --user start autopublish.service"
echo "Instagram manual trigger:  systemctl --user start autopublish-instagram.service"
echo "View LinkedIn logs:        journalctl --user -u autopublish -f"
echo "View Instagram logs:       journalctl --user -u autopublish-instagram -f"
