namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
//open WebSharper.UI.Next.Input

[<JavaScript>]
type TitleButton =
    {
        Icon:string
        Action:Panel->unit            
    }
    member x.Render panel=
        iAttr[Attr.Class "material-icons orange600 small"
              Attr.Style "cursor" "pointer"
              on.click (fun elem _->x.Action panel)
              ][text x.Icon]:>Doc
and [<JavaScript>] Panel =
    {
        Key:Key
        Left:Var<double>
        Top:Var<double>
        Element:Var<Dom.Element>
        ArrangePanels:Panel->unit
        PannelAttrs:seq<Attr>
        TitleAttrs:seq<Attr>
        TitleContent:Doc
        TitleButtons:list<TitleButton>
        PanelContent:Doc
    }
    static member Create =
        {   
            Key=Key.Fresh()
            Left = Var.Create 0.0
            Top = Var.Create 0.0
            Element=Var.Create null
            ArrangePanels = (fun _ ->())
            PannelAttrs = []
            TitleAttrs =  [Attr.Class "panelTitle"]
            TitleContent = div[]
            TitleButtons = []
            PanelContent = div[]

        }
    member x.WithPannelAttrs attrs = {x with PannelAttrs=attrs}
    member x.WithTitleAttrs attrs = {x with TitleAttrs=attrs}
    member x.WithTitleContent content = {x with TitleContent=content}
    member x.WithTitleButtons buttons = {x with TitleButtons=buttons}
    member x.WithPanelContent content = {x with PanelContent=content}
    member x.WithArrangePanelsFnc fnc = {x with ArrangePanels=fnc}
    member x.Render=
        let dragActive = Var.Create false
        let mouseOverVar = Var.Create false
        let leftOffset=Var.Create 0.0
        let topOffset=Var.Create 0.0

        let mapDragActive=View.Map (fun (v) -> 
                                                  //Console.Log ("In mapDragActive Last left:"+x.left.Value.ToString())
                                                  v&& dragActive.Value) 
                                                  Input.Mouse.LeftPressed
        let lastHeldPos = View.UpdateWhile (0,0) mapDragActive Input.Mouse.Position
        let toLocal = lastHeldPos.Map (fun (x_cor,y_cor)->
                                                  //Console.Log ("In toLocal")
                                                  if dragActive.Value then 
                                                      let domRectParent = x.Element.Value.GetBoundingClientRect()
                                                      let domRectParentParent = x.Element.Value.ParentElement.GetBoundingClientRect()
                                                      let maxX = domRectParentParent.Width-domRectParent.Width
                                                      let maxY =  domRectParentParent.Height-domRectParent.Height
                                                      let xPos=min maxX (max 0.0 ((double)x_cor - leftOffset.Value))
                                                      let yPos=min maxY (max 0.0 ((double)y_cor - topOffset.Value))
                                                      x.Left.Value <- xPos
                                                      x.Top.Value <- yPos
                                                      Console.Log ("Last left:"+x.Left.Value.ToString())
                                                      x.ArrangePanels x
                                                      (xPos,yPos)
                                                  else (x.Left.Value,x.Top.Value)
                                                  )
        let titleAttrsUpdated = Seq.concat [
                                    x.TitleAttrs
                                    [
                                        Attr.Style "cursor" "grab"
                                        on.mouseEnter  (fun _ _ -> 
                                              //Console.Log ("mouseEnter")
                                              mouseOverVar.Value<-true)
                                        on.mouseLeave (fun _ _ -> if not dragActive.Value then mouseOverVar.Value<-false)
                                        on.mouseUp (fun _ _ -> mouseOverVar.Value<-false
                                                               dragActive.Value <- false)
                                        on.mouseDown  (fun (elm:Dom.Element) evnt ->
                                                                    if mouseOverVar.Value 
                                                                     && x.Element.Value.ParentElement <> null && x.Element.Value.ParentElement.ParentElement <> null then
                                                                         dragActive.Value <- true
                                                                    leftOffset.Value <- (double)evnt.ClientX - x.Left.Value
                                                                    topOffset.Value <- (double)evnt.ClientY - x.Top.Value
                                                                    )                                       
                                    ]|>Seq.ofList
                               ]
        let titleContentUpdated =
                            tableAttr [Attr.Style "width" "100%"]
                                      [tr[
                                         td [x.TitleContent]
                                         tdAttr[
                                           Attr.Style "text-align" "right"
                                           Attr.Style "vertical-align" "middle"]
                                           (x.TitleButtons |>List.map (fun btn -> btn.Render x))
                                         ]]
                                      

        let panelAttrsUpdated = 
                Seq.concat [
                     x.PannelAttrs
                     [
                         Attr.Style "position" "absolute"
                         Attr.DynamicStyle "left" (View.Map (fun (x) -> 
                                                           //Console.Log "x from left"
                                                           sprintf "%fpx" x) x.Left.View)
                         Attr.DynamicStyle "left" (View.Map (fun (x,y) -> 
                                                           //Console.Log "x from toLocal"
                                                           sprintf "%fpx" x) toLocal)
                         Attr.DynamicStyle "top"  (View.Map (fun (x,y) -> sprintf "%fpx" y)  toLocal)
                         Attr.DynamicStyle "top"  (View.Map (fun (y) -> sprintf "%fpx" y)  x.Top.View)
                     ]|>Seq.ofList
                 ]
        let resDiv = 
            divAttr
                 panelAttrsUpdated
                 [
                     divAttr titleAttrsUpdated [titleContentUpdated]
                     x.PanelContent
                 ]
        x.Element.Value <- resDiv.Dom
        resDiv
