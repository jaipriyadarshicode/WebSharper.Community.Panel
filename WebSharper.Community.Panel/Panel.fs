namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.UI.Next.Input

[<JavaScript>]
module Library = 

    type PanelInstance =
        {
            mouseOverVar:Var<bool>
            leftOffset:Var<int>
            topOffset:Var<int>
            leftPosParVar:Var<int>
            lastLeft:Var<int>
            lastTop:Var<int>
            minX:Var<int>
            maxX:Var<int>
            minY:Var<int>
            maxY:Var<int>
        }
        static member Create =
            {   
                mouseOverVar = Var.Create false
                leftOffset = Var.Create 0
                topOffset = Var.Create 0
                leftPosParVar = Var.Create 0
                lastLeft = Var.Create 0
                lastTop = Var.Create 0
                minX=Var.Create 0
                maxX=Var.Create 0
                minY=Var.Create 0
                maxY=Var.Create 0
            }
        member x.mapDragActive=View.Map (fun (v) -> 
                                                  Console.Log ("In mapDragActive Last left:"+x.lastLeft.Value.ToString())
                                                  v && x.mouseOverVar.Value) Mouse.LeftPressed
        member x.lastHeldPos = View.UpdateWhile (0,0) x.mapDragActive Mouse.Position
        member x.toLocal = x.lastHeldPos.Map (fun (x_cor,y_cor)->
                                                  let xPos=min x.maxX.Value (max x.minX.Value (x_cor - x.leftOffset.Value))
                                                  let yPos=min x.maxY.Value (max x.minY.Value (y_cor - x.topOffset.Value))
                                                  x.lastLeft.Value <- xPos
                                                  x.lastTop.Value <- yPos
                                                  Console.Log ("Last left:"+x.lastLeft.Value.ToString())
                                                  (xPos,yPos))

        member x.panelAttr pannelAttrs titleAttrs titleContent childContent=
            let titleAttrsUpdated = Seq.concat [
                                        titleAttrs
                                        [
                                            on.mouseOver  (fun _ _ -> x.mouseOverVar.Value<-true)
                                            on.mouseLeave (fun _ _ -> x.mouseOverVar.Value<-false)
                                            on.mouseDown  (fun (elm:Dom.Element) evnt ->
                                                                        x.leftOffset.Value <- evnt.ClientX - x.lastLeft.Value
                                                                        x.topOffset.Value <- evnt.ClientY - x.lastTop.Value
                                                                        //Console.Log ("Width: "+elm.ParentElement.ParentElement.GetBoundingClientRect().Width.ToString())
                                                                        x.maxX.Value <- (int)(elm.ParentElement.ParentElement.GetBoundingClientRect().Width-elm.ParentElement.GetBoundingClientRect().Width)
                                                                        x.maxY.Value <- (int)(elm.ParentElement.ParentElement.GetBoundingClientRect().Height-elm.ParentElement.GetBoundingClientRect().Height))
                                            on.mouseMove  (fun _ evnt -> Console.Log ("on.mouseMove:"+evnt.Button.ToString()))                                        
                                        ]|>Seq.ofList
                                   ]
            let panelAttrsUpdated = 
                    Seq.concat [
                         pannelAttrs
                         [
                             Attr.Style "position" "relative"
                             Attr.DynamicStyle "left" (View.Map (fun (x,y) -> sprintf "%dpx" x) x.toLocal)
                             Attr.DynamicStyle "top"  (View.Map (fun (x,y) -> sprintf "%dpx" y) x.toLocal)
                         ]|>Seq.ofList
                     ]
            divAttr
                 panelAttrsUpdated
                 [
                     divAttr titleAttrsUpdated titleContent
                     childContent
                 ]
