Set ws = CreateObject("Wscript.Shell")
Function runcode(code, file)
	ws.run """" & code & """workspace\" & file & ".code-workspace"""
End Function