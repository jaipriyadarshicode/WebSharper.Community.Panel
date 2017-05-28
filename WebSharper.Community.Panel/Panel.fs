namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.UI.Next.Input

[<JavaScript>]
module Library = 

        let mouseOverVar = Var.Create false
        let leftOffset = Var.Create 0
        let topOffset = Var.Create 0
        let leftPosParVar = Var.Create 0
        let lastLeft = Var.Create 0
        let lastTop = Var.Create 0
        let minX=Var.Create 0
        let maxX=Var.Create 0
        let minY=Var.Create 0
        let maxY=Var.Create 0
        let mapDragActive=View.Map (fun (v) -> Console.Log ("In mapDragActive Last left:"+lastLeft.Value.ToString())
                                               v && mouseOverVar.Value) Mouse.LeftPressed
        let lastHeldPos = View.UpdateWhile (0,0) mapDragActive Mouse.Position
        let toLocal = lastHeldPos.Map (fun (x,y)->
                                                  let xPos=min maxX.Value (max minX.Value (x - leftOffset.Value))
                                                  let yPos=min maxY.Value (max minY.Value (y - topOffset.Value))
                                                  lastLeft.Value <- xPos
                                                  lastTop.Value <- yPos
                                                  Console.Log ("Last left:"+lastLeft.Value.ToString())
                                                  (xPos,yPos))

        let panelAttr pannelAttrs titleAttrs titleContent childContent=
            let titleAttrsUpdated = Seq.concat [
                                        titleAttrs
                                        [
                                            on.mouseOver  (fun _ _ -> mouseOverVar.Value<-true)
                                            on.mouseLeave (fun _ _ -> mouseOverVar.Value<-false)
                                            on.mouseDown  (fun (elm:Dom.Element) evnt ->
                                                                        leftOffset.Value <- evnt.ClientX - lastLeft.Value
                                                                        topOffset.Value <- evnt.ClientY - lastTop.Value
                                                                        //Console.Log ("Width: "+elm.ParentElement.ParentElement.GetBoundingClientRect().Width.ToString())
                                                                        maxX.Value <- (int)(elm.ParentElement.ParentElement.GetBoundingClientRect().Width-elm.ParentElement.GetBoundingClientRect().Width)
                                                                        maxY.Value <- (int)(elm.ParentElement.ParentElement.GetBoundingClientRect().Height-elm.ParentElement.GetBoundingClientRect().Height))
                                            on.mouseMove  (fun _ evnt -> Console.Log ("on.mouseMove:"+evnt.Button.ToString()))                                        
                                        ]|>Seq.ofList
                                   ]
            let panelAttrsUpdated = 
                    Seq.concat [
                         pannelAttrs
                         [
                             Attr.Style "position" "relative"
                             Attr.DynamicStyle "left" (View.Map (fun (x,y) -> sprintf "%dpx" x) toLocal)
                             Attr.DynamicStyle "top"  (View.Map (fun (x,y) -> sprintf "%dpx" y) toLocal)
                         ]|>Seq.ofList
                     ]
            divAttr
                 panelAttrsUpdated
                 [
                     divAttr titleAttrsUpdated titleContent
                     childContent
                 ]
