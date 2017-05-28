namespace WebSharper.Community.Panel.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel.Library

[<JavaScript>]
module Client =

    let Main () =
        div [
            divAttr[ Attr.Style "border" "1px solid white"
                     Attr.Style "Width" "500px"
                     Attr.Style "Height" "400px"
            ][  panelAttr
                        [Attr.Style "Width" "150px"]
                        [Attr.Class "panelTitle"]
                        [text "Panel 1"]
                        (divAttr
                            [Attr.Class "panelContent"]
                            [text "Content"])
            ]
        ]
