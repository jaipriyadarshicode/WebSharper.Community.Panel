
module Settings 
    #load @"..\..\WebSharper.Community.Build\gloabalSettings.fsx"
    let projectName = "Panel"
    let projectDescription = "WebSharper floating panel component"
    let dependencies = [("WebSharper.UI.Next","")
                        ("WebSharper.Community.PropertyGrid",globalSettings.version)]
    let releaseNotes = ""