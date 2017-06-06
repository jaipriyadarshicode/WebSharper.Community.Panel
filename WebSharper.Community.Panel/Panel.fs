namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.UI.Next.Input

[<JavaScript>]
type Panel =
    {
        mouseOverVar:Var<bool>
        mouseDownVar:Var<bool>
        leftOffset:Var<double>
        topOffset:Var<double>
        lastLeft:Var<double>
        lastTop:Var<double>
        element:Var<Dom.Element>
        arrangePanels:Panel->unit
    }
    static member Create arrangePanels=
        {   
            mouseOverVar = Var.Create false
            mouseDownVar = Var.Create false
            leftOffset = Var.Create 0.0
            topOffset = Var.Create 0.0
            lastLeft = Var.Create 0.0
            lastTop = Var.Create 0.0
            element=Var.Create ((div[]).Dom)
            arrangePanels = arrangePanels
        }


    member x.panelAttr pannelAttrs titleAttrs titleContent childContent=
        let titleAttrsUpdated = Seq.concat [
                                    titleAttrs
                                    [
                                        Attr.Style "cursor" "grab"
                                        on.mouseEnter  (fun _ _ -> 
                                              //Console.Log ("mouseEnter")
                                              x.mouseOverVar.Value<-true)
                                        on.mouseLeave (fun _ _ -> x.mouseOverVar.Value<-false
                                                                  )
                                        on.mouseUp (fun _ _ -> x.mouseDownVar.Value<-false)
                                        on.mouseDown  (fun (elm:Dom.Element) evnt ->
                                                                    x.mouseDownVar.Value <-true
                                                                    x.leftOffset.Value <- (double)evnt.ClientX - x.lastLeft.Value
                                                                    x.topOffset.Value <- (double)evnt.ClientY - x.lastTop.Value
                                                                    //Console.Log ("mouseDown")
                                                                    //Console.Log ("Width: "+elm.ParentElement.ParentElement.GetBoundingClientRect().Width.ToString())
                                                                    //x.maxX.Value <- (elm.ParentElement.ParentElement.GetBoundingClientRect().Width-elm.ParentElement.GetBoundingClientRect().Width)
                                                                    //x.maxY.Value <- (elm.ParentElement.ParentElement.GetBoundingClientRect().Height-elm.ParentElement.GetBoundingClientRect().Height)
                                                                    )
                                        on.mouseMove  (fun _ evnt -> 
                                                          if x.mouseDownVar.Value && x.mouseOverVar.Value 
                                                             && x.element.Value.ParentElement <> null && x.element.Value.ParentElement.ParentElement <> null then 
                                                              let x_cor = evnt.ClientX
                                                              let y_cor = evnt.ClientY
                                                              //Console.Log ("on.mouseMove:"+evnt.Button.ToString() + " " + x_cor.ToString())
                                                              let domRectParent = x.element.Value.GetBoundingClientRect()
                                                              let domRectParentParent = x.element.Value.ParentElement.GetBoundingClientRect()
                                                              let maxX = domRectParentParent.Width-domRectParent.Width
                                                              let maxY =  domRectParentParent.Height-domRectParent.Height
                                                              let xPos=min maxX (max 0.0 ((double)x_cor - x.leftOffset.Value))
                                                              let yPos=min maxY (max 0.0 ((double)y_cor - x.topOffset.Value))
                                                              x.lastLeft.Value <- xPos
                                                              x.lastTop.Value <- yPos
                                                              x.arrangePanels x
                                                              //evnt.StopPropagation()
                                                              //Console.Log ("Last left:"+x.lastLeft.Value.ToString())
                                                      )                                        
                                    ]|>Seq.ofList
                               ]
        let panelAttrsUpdated = 
                Seq.concat [
                     pannelAttrs
                     [
                         Attr.Style "position" "absolute"
                         Attr.DynamicStyle "left" (View.Map (fun (x) -> 
                                                           Console.Log "x from lastLeft"
                                                           sprintf "%fpx" x) x.lastLeft.View)
                         Attr.DynamicStyle "top"  (View.Map (fun (y) -> sprintf "%fpx" y)  x.lastTop.View)
        (*                 Attr.DynamicStyle "left" (View.Map (fun (x,y) -> 
                                                           Console.Log "x from moveTo"
                                                           sprintf "%fpx" x) x.moveTo.View) *)
              (*            Attr.DynamicStyle "top"  (View.Map (fun (x,y) -> sprintf "%fpx" y) x.moveTo.View)
                        Attr.DynamicStyle "left" (View.Map (fun (x,y) -> 
                                                           Console.Log "x from toLocal"
                                                           sprintf "%fpx" x) toLocal) 
                         Attr.DynamicStyle "top"  (View.Map (fun (x,y) -> sprintf "%fpx" y) toLocal) *)
                     ]|>Seq.ofList
                 ]
        let resDiv = 
            divAttr
                 panelAttrsUpdated
                 [
                     divAttr titleAttrsUpdated titleContent
                     childContent
                 ]
        x.element.Value <- resDiv.Dom
        resDiv
