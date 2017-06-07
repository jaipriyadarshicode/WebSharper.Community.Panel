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
        left:Var<double>
        top:Var<double>
        element:Var<Dom.Element>
        arrangePanels:Panel->unit
        pannelAttrs:seq<Attr>
        titleAttrs:seq<Attr>
        titleContent:seq<Doc>
        content:Doc
    }
    static member Create arrangePanels pannelAttrs titleAttrs titleContent content=
        {   
            left = Var.Create 0.0
            top = Var.Create 0.0
            element=Var.Create ((div[]).Dom)
            arrangePanels = arrangePanels
            pannelAttrs = pannelAttrs
            titleAttrs = titleAttrs
            titleContent = titleContent
            content = content
        }
    member x.panelAttr=
        let dragActive = Var.Create false
        let mouseOverVar = Var.Create false
        let leftOffset=Var.Create 0.0
        let topOffset=Var.Create 0.0
        let titleAttrsUpdated = Seq.concat [
                                    x.titleAttrs
                                    [
                                        Attr.Style "cursor" "grab"
                                        on.mouseEnter  (fun _ _ -> 
                                              //Console.Log ("mouseEnter")
                                              mouseOverVar.Value<-true)
                                        on.mouseLeave (fun _ _ -> if not dragActive.Value then mouseOverVar.Value<-false)
                                        on.mouseUp (fun _ _ -> mouseOverVar.Value<-false
                                                               dragActive.Value <- false)
                                        on.mouseDown  (fun (elm:Dom.Element) evnt ->
                                                                    if mouseOverVar.Value then dragActive.Value <- true
                                                                    leftOffset.Value <- (double)evnt.ClientX - x.left.Value
                                                                    topOffset.Value <- (double)evnt.ClientY - x.top.Value
                                                                    )
                                        on.mouseMove  (fun _ evnt -> 
                                                          Console.Log ("on.mouseMove:"+evnt.Button.ToString() + " " + evnt.ClientX.ToString())
                                                          if dragActive.Value 
                                                             && x.element.Value.ParentElement <> null && x.element.Value.ParentElement.ParentElement <> null then 
                                                              let x_cor = evnt.ClientX
                                                              let y_cor = evnt.ClientY
                                                              let domRectParent = x.element.Value.GetBoundingClientRect()
                                                              let domRectParentParent = x.element.Value.ParentElement.GetBoundingClientRect()
                                                              let maxX = domRectParentParent.Width-domRectParent.Width
                                                              let maxY =  domRectParentParent.Height-domRectParent.Height
                                                              let xPos=min maxX (max 0.0 ((double)x_cor - leftOffset.Value))
                                                              let yPos=min maxY (max 0.0 ((double)y_cor - topOffset.Value))
                                                              x.left.Value <- xPos
                                                              x.top.Value <- yPos
                                                              x.arrangePanels x
                                                      )                                        
                                    ]|>Seq.ofList
                               ]
        let panelAttrsUpdated = 
                Seq.concat [
                     x.pannelAttrs
                     [
                         Attr.Style "position" "absolute"
                         Attr.DynamicStyle "left" (View.Map (fun (x) -> 
                                                           //Console.Log "x from lastLeft"
                                                           sprintf "%fpx" x) x.left.View)
                         Attr.DynamicStyle "top"  (View.Map (fun (y) -> sprintf "%fpx" y)  x.top.View)
                     ]|>Seq.ofList
                 ]
        let resDiv = 
            divAttr
                 panelAttrsUpdated
                 [
                     divAttr titleAttrsUpdated x.titleContent
                     x.content
                 ]
        x.element.Value <- resDiv.Dom
        resDiv
