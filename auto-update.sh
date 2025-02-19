#!/usr/bin/env bash
(
	image_name="ghcr.io/denebtm/netdeneb:latest"
	old_id="$(podman image inspect "$image_name" | jq -r '.[0].Id')"
	podman pull "$image_name"
	if [ "$(podman container inspect netdeneb | jq -r '.[0].Image')" != "$old_id" ]; then
	    echo "restarting container"
	    sudo /srv/netdeneb/restart.sh
	fi
) &
(
    cd /srv/netdeneb/git
    git pull | grep -v 'up to date' || true
)

wait
