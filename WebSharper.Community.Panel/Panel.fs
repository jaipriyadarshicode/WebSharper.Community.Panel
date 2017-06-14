namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.PropertyGrid
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
        Relayout:Panel->unit
        PannelAttrs:seq<Attr>
        IsWithTitle : bool
        TitleAttrs:seq<Attr>
        TitleContent:Doc
        TitleButtons:list<TitleButton>
        PanelContent:Doc
        Children : PanelContainer
        InternalName:string
        onAfterRender:Dom.Element -> unit
        Properties : List<IProperty>
    }
    static member Create =
        {   
            Key=Key.Fresh()
            Left = Var.Create 0.0
            Top = Var.Create 0.0
            Element=Var.Create null
            Relayout = (fun _ ->())
            PannelAttrs = []
            IsWithTitle = true
            TitleAttrs =  [Attr.Class "panelTitle"]
            TitleContent = div[]
            TitleButtons = []
            PanelContent = div[]
            Children = PanelContainer.Create
            InternalName=""
            onAfterRender=(fun (_) ->())
            Properties = []
        }
    member x.WithPannelAttrs attrs = {x with PannelAttrs=attrs}
    member x.WithTitleAttrs attrs = {x with TitleAttrs=attrs}
    member x.WithTitleContent content = {x with TitleContent=content}
    member x.WithTitleButtons buttons = {x with TitleButtons=buttons}
    member x.WithPanelContent content = {x with PanelContent=content}
    member x.WithRelayoutFnc fnc = {x with Relayout=fnc}
    member x.WithChildPanelContainer container = {x with Children = container}
    member x.WithTitle withTitle = {x with IsWithTitle = withTitle} 
    member x.WithInternalName name = {x with InternalName = name} 
    member x.WithOnAfterRender fnc = {x with onAfterRender = fnc} 
    member x.WithProperties properties = {x with Properties = properties}
    member x.Render =
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
                                                      x.Relayout x
                                                      (xPos,yPos)
                                                  else (x.Left.Value,x.Top.Value)
                                                  )
        let titleAttrsUpdated = Seq.concat [
                                    x.TitleAttrs
                                    [
                                        Attr.Style "cursor" "grab"
                                        on.mouseEnter  (fun _ _ ->mouseOverVar.Value<-true)
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
                     (if x.IsWithTitle then
                        divAttr titleAttrsUpdated [titleContentUpdated]
                      else div[])
                     x.PanelContent
                     x.Children.Render
                 ]
        x.Element.Value <- resDiv.Dom
        resDiv.OnAfterRender(x.onAfterRender)

and [<JavaScript>] ILayoutManager=
        abstract member Relayout :   panelContaner:PanelContainer->exceptPanel:Panel->unit
        abstract member PlacePanel : panelContaner:PanelContainer->panel:Panel -> unit

and [<JavaScript>] PanelContainer =
    {
        Width:Var<double>
        Height:Var<double>
        PanelItems : ListModel<Key,Panel>
        LayoutManager : ILayoutManager 
        ContainerAttributes :seq<Attr>
    }
    static member Create =
        {
            Width = Var.Create 0.0
            Height = Var.Create 0.0
            PanelItems = ListModel.Create (fun item ->item.Key) []
            LayoutManager = {new ILayoutManager with override x.Relayout panelItems exceptPanel = ()
                                                     override x.PlacePanel panelItems exceptPanel = ()}
            ContainerAttributes = []
        }
    member x.WithAttributes attrs = {x with ContainerAttributes = attrs}
    member x.WithLayoutManager layoutManager = {x with LayoutManager = layoutManager}
    member x.WithWidth cx = {x with Width = Var.Create cx}
    member x.WithHeight cy = {x with Height = Var.Create cy}
    member x.FindPanelItem panel = x.PanelItems|>List.ofSeq |>List.find (fun item -> item.Element = panel.Element)
    member x.Resize cx cy = x.Width.Value <- cx
                            x.Height.Value <- cy
    member x.AddPanel (panel:Panel) = 
        x.PanelItems.Add  (panel.WithRelayoutFnc(x.LayoutManager.Relayout x))
        //x.LayoutManager.Relayout x panel
    member x.Render = 
        let attrsUpdated = Seq.concat [
                                            x.ContainerAttributes
                                            [
                                                Attr.DynamicStyle "width"  (View.Map (fun (x) -> sprintf "%fpx" x)  x.Width.View)
                                                Attr.DynamicStyle "height" (View.Map (fun (y) -> sprintf "%fpx" y)  x.Height.View)
                                                Attr.Style "position" "relative"                                      
                                            ]|>Seq.ofList
                                      ]
        divAttr attrsUpdated
                [
                    ListModel.View x.PanelItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (fun item -> (item.Render).OnAfterRender(fun el -> x.LayoutManager.PlacePanel x item))
                ]