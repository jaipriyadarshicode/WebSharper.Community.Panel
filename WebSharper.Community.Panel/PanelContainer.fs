namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel


[<JavaScript>]
type PanelItem =
    {
        Key:Key
        Name : string
        Panel:Panel
    }
    static member Create name arrangePanels panelAttrs titleAttrs titleContent titleButtons content=
        {   
            Key=Key.Fresh()
            Name = name 
            Panel =  Panel.Create arrangePanels panelAttrs titleAttrs titleContent titleButtons content
        }

[<JavaScript>]
type PanelContainer =
    {
        PanelItems : ListModel<Key,PanelItem>
    }
    static member Create =
        {
            PanelItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.FindPanelItem panel = x.PanelItems|>List.ofSeq |>List.find (fun item -> item.Panel.element = panel.element)
    member x.CollectFreeSpace (rcContainer:Rect) (except:PanelItem)= 
        x.PanelItems
        |>List.ofSeq 
        |>List.filter (fun item -> item.Key <> except.Key)
        |>List.fold (fun (acc:Rect list) panel -> 
                                let rcPanel = ((Rect.fromDomRect panel.Panel.element.Value)
                                                .offset panel.Panel.left.Value panel.Panel.top.Value)
                                                .inflate 5.0 5.0
                                Console.Log ("collectFreeSpace: " + rcPanel.ToString())   
                                let rcTop = {left = 0.0; right = rcContainer.right; top = 0.0; bottom = rcPanel.top }
                                let rcLeft = {left = 0.0; right = rcPanel.left; top = rcPanel.top; bottom = rcPanel.bottom }
                                rcTop::rcLeft
                                ::{rcLeft with left = rcPanel.right; right = rcContainer.right}
                                ::{rcTop with top = rcPanel.bottom; bottom = rcContainer.bottom}::[]
                                |>List.map (fun rc -> acc |> List.map (fun accRc -> accRc.intersect rc) 
                                                          |> List.filter (fun accRect -> 
                                                                               Console.Log ("filter: " + accRect.ToString())   
                                                                               not accRect.isEmpty ))
                                |>List.concat
                                ) [rcContainer]
    member x.ArrangePanels (exceptPanel:Panel) =
        let listOfPanelItems= x.PanelItems |> List.ofSeq
        let exceptPanelItem=listOfPanelItems |> List.find (fun panelItem->panelItem.Panel.left.Value = exceptPanel.left.Value && panelItem.Panel.top.Value = exceptPanel.top.Value)
        let foundPanel=
            x.PanelItems
            |>List.ofSeq
            |>List.tryFind (fun panelItem-> panelItem.Key <> exceptPanelItem.Key && not ((Rect.fromPanel panelItem.Panel).intersect (Rect.fromPanel exceptPanelItem.Panel)).isEmpty)
        match foundPanel with
        |None ->()
        |Some(panelItem) -> x.MovePanelToFreeSpace panelItem
    member x.MovePanelToFreeSpace (panelItem:PanelItem) = 
        let rcPanel=Rect.fromPanel (panelItem.Panel)
        let rcContainer = Rect.fromDomRect (panelItem.Panel.element.Value.ParentElement)
       //Console.Log ("Add panel: " + rcPanel.ToString() + " " + rcContainer.ToString())       
        let foundCandidate=
            x.CollectFreeSpace rcContainer panelItem
            |>List.tryFind (fun rc -> 
                      Console.Log ("Finds free rect: " + rc.ToString())             
                      rc.width >= rcPanel.width && rc.height >= rcPanel.height)
        match foundCandidate with 
        |None->()
        |Some(rc)->
              panelItem.Panel.left.Value <- rc.left + 5.0
              panelItem.Panel.top.Value <- rc.top + 5.0 
    member x.CreateItem name panelAttrs titleAttrs titleContent titleButtons content=
            let newItem=PanelItem.Create name (x.ArrangePanels) panelAttrs titleAttrs titleContent titleButtons content
            x.PanelItems.Add  newItem
    member x.RenderPanelItem (haItem:PanelItem) =     
        (haItem.Panel.Render).OnAfterRender(fun el -> x.MovePanelToFreeSpace haItem)
