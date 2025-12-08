#! /bin/bash

if [ -e "$HOME/.manage-tool" ] && [ -t 0 ]; then
    workspace_str=$(cat "$HOME/.manage-tool" | grep "run_dir")
    IFS='=' read -ra temp <<< "$workspace_str"
    workspace=${temp[1]}
    rm -rf "$HOME/.manage-tool"
    cd "${workspace//\~/$HOME}"
    vim
    exit 0
fi
