namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html

[<JavaScript>]
type WrapControlsAligment = 
|Vertical
|Horizontal

[<JavaScript>]
module WrapControls =

    let Render icons  aligment content= 
        let mouseOver = Var.Create false
        let icons = divAttr[Attr.DynamicStyle "display" (View.Map (fun value -> if not value then "none" else "block") mouseOver.View)] 
                           icons
        match aligment with
        |Vertical -> div[icons;content]
        |Horizontal ->  table[
                               tr[td[content];td[icons]]
                              ].OnMouseEnter(fun _ _ ->mouseOver.Value <- true).OnMouseLeave(fun _ _ -> mouseOver.Value <- false)
