Set WS = CreateObject("Wscript.Shell")
Set SA = CreateObject("Shell.Application")
Function Runcode(code, file)
	WS.Run """" & code & """ " & """" & GetDir() & "workspace\" & file & ".code-workspace"""
	' SA.ShellExecute code, GetDir() & "workspace\" & file & ".code-workspace", "", "runas", 1
End Function
Function Runfile(file)
	WS.Run file
End Function