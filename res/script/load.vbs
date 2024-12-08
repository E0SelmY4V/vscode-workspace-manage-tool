On Error Resume Next

Me.ResizeTo 1225, 600

Function GetDir()
	GetDir = Replace(Mid(Left(location.href, InStrRev(location.href, "/")), 9), "/", "\")
End Function
