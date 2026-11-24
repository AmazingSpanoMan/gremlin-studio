!macro NSIS_HOOK_PREINSTALL
  ; Ensure any running Gremlin Studio process is closed before replacing binaries
  nsExec::ExecToStack 'taskkill /F /IM gremlin-studio.exe'
  Pop $0
  Pop $1
  Sleep 400
!macroend

!macro NSIS_HOOK_POSTINSTALL
  ; Refresh Windows Explorer icon cache so updated app icons appear immediately
  nsExec::ExecToStack '"$WINDIR\System32\ie4uinit.exe" -show'
  Pop $0
  Pop $1
!macroend
