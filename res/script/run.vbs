Set WS = CreateObject("Wscript.Shell")
Set SA = CreateObject("Shell.Application")
Function Runcode(code, file, admin)
	If admin Then
		SA.ShellExecute code, """" & workspaceDir & "\" & file & ".code-workspace""", "", "runas", 1
	Else
		SA.ShellExecute code, """" & workspaceDir & "\" & file & ".code-workspace""", ""
	End If
End Function
Function Runvim(d, folder)
	Runfile "wsl.exe -d " & d & " --shell-type login -- echo ""run_dir=" & folder & """ > $HOME/.manage-tool", 0, True
End Function
Function Runfile(file, show, sync)
	If IsEmpty(show) Then show = 1
	If IsEmpty(sync) Then sync = False
	WS.Run file, show, sync
End Function
Function Exec(command)
	Exec = WS.Exec(command).Stdout.ReadAll()
End Function
