Set WS = CreateObject("Wscript.Shell")
Set SA = CreateObject("Shell.Application")
Function Runcode(code, file, admin)
	If admin Then
		SA.ShellExecute code, GetDir() & "workspace\" & file & ".code-workspace", "", "runas", 1
	Else
		SA.ShellExecute code, GetDir() & "workspace\" & file & ".code-workspace", ""
	End If
End Function
Function Runfile(file, hidden, sync)
	If IsEmpty(hidden) Then hidden = 1
	If IsEmpty(sync) Then sync = False
	WS.Run file, hidden, sync
End Function