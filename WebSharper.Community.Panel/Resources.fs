namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.Core.Resources

[<JavaScript>]
module Resources =
    [<assembly: System.Web.UI.WebResource("Panel.css", "text/css")>]
    do()
    type StyleResource() =
        inherit BaseResource("Panel.css")