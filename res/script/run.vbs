Set WS = CreateObject("Wscript.Shell")
Set SA = CreateObject("Shell.Application")
Function Runcode(code, file, admin)
	If admin Then
		SA.ShellExecute code, GetDir() & "workspace\" & file & ".code-workspace", "", "runas", 1
	Else
		SA.ShellExecute code, GetDir() & "workspace\" & file & ".code-workspace", ""
	End If
End Function
Function Runfile(file)
	WS.Run file
End Function