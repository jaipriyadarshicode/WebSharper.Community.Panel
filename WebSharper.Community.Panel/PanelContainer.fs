namespace WebSharper.Community.Panel

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel

[<JavaScript>]
type PanelContainer =
    {
        PanelItems : ListModel<Key,Panel>
    }
    static member Create =
        {
            PanelItems = ListModel.Create (fun item ->item.Key) []
        }
    member x.FindPanelItem panel = x.PanelItems|>List.ofSeq |>List.find (fun item -> item.Element = panel.Element)
    member x.CollectFreeSpace (rcContainer:Rect) (except:Panel)= 
        x.PanelItems
        |>List.ofSeq 
        |>List.filter (fun item -> item.Key <> except.Key)
        |>List.fold (fun (acc:Rect list) panel -> 
                                let rcPanel = ((Rect.fromDomRect panel.Element.Value)
                                                .offset panel.Left.Value panel.Top.Value)
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
        let exceptPanelItem=listOfPanelItems |> List.find (fun panelItem->panelItem.Left.Value = exceptPanel.Left.Value && panelItem.Top.Value = exceptPanel.Top.Value)
        let foundPanel=
            x.PanelItems
            |>List.ofSeq
            |>List.tryFind (fun panelItem-> panelItem.Key <> exceptPanelItem.Key && not ((Rect.fromPanel panelItem).intersect (Rect.fromPanel exceptPanelItem)).isEmpty)
        match foundPanel with
        |None ->()
        |Some(panelItem) -> x.MovePanelToFreeSpace panelItem
    member x.MovePanelToFreeSpace (panelItem:Panel) = 
        let rcPanel=Rect.fromPanel (panelItem)
        let rcContainer = Rect.fromDomRect (panelItem.Element.Value.ParentElement)
       //Console.Log ("Add panel: " + rcPanel.ToString() + " " + rcContainer.ToString())       
        let foundCandidate=
            x.CollectFreeSpace rcContainer panelItem
            |>List.tryFind (fun rc -> 
                      Console.Log ("Finds free rect: " + rc.ToString())             
                      rc.width >= rcPanel.width && rc.height >= rcPanel.height)
        match foundCandidate with 
        |None->()
        |Some(rc)->
              panelItem.Left.Value <- rc.left + 5.0
              panelItem.Top.Value <- rc.top + 5.0 
    member x.AddPanel (panel:Panel)= //panelAttrs titleAttrs titleContent titleButtons content=
            //let newItem=Panel.Create (x.ArrangePanels) //panelAttrs titleAttrs titleContent titleButtons content
            x.PanelItems.Add  (panel.WithArrangePanelsFnc(x.ArrangePanels))
    member x.RenderPanelItem (haItem:Panel) =     
        (haItem.Render).OnAfterRender(fun el -> x.MovePanelToFreeSpace haItem)
