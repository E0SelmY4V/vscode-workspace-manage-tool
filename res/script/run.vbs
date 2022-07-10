Set WS = CreateObject("Wscript.Shell")
Function Runcode(code, file)
	WS.Run """" & code & """ " & _
		"""" & Replace( _
			Mid(Left( _
					location.href, _
					InStrRev(location.href, "/") _
			), 9 _
		), "/", "\") & "workspace\" & file & ".code-workspace"""
End Function
Function Runfile(file)
	WS.Run file
End Function