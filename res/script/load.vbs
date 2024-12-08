On Error Resume Next

Me.ResizeTo 1225, 600

Function GetDir()
	GetDir = Replace(Mid(Left(location.href, InStrRev(location.href, "/")), 9), "/", "\")
End Function

Set Fso = CreateObject("Scripting.FileSystemObject")
Set WS = CreateObject("Wscript.Shell")
For No = 0 to CONFIG.maxBgp - 1
	If Fso.FileExists(GetDir() & "res\bgp\bgp" & No & ".jpg") Then
		If Fso.FileExists(GetDir() & "res\bgp\current-bgp.jpg") Then Fso.DeleteFile GetDir() & "res\bgp\current-bgp.jpg"
		Fso.MoveFile GetDir() & "res\bgp\bgp" & No & ".jpg", GetDir() & "res\bgp\current-bgp.jpg"
		WS.run """node"" """ & GetDir() & "res\script\down-bgp.js"" """ & No & """", 0
		Exit For
	End If
	If not Fso.FileExists(GetDir() & "res\bgp\bgp" & No) Then WS.run """node"" """ & GetDir() & "res\script\down-bgp.js"" """ & No & """", 0
Next
