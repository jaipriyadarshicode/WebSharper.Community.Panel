namespace WebSharper.Community.Panel.Test


open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel.Library
open WebSharper.Community.Panel.Rect.Library

[<JavaScript>]
module Client =

    type PanelItem =
        {
            Key:Key
            z_index : int
            name : string
            panel:PanelInstance
        }
        static member Create name z_index=
            {   
                Key=Key.Fresh()
                name = name
                z_index = z_index
                panel = PanelInstance.Create
            }
    type PanelModel =
        {
            PanelItems : ListModel<Key,PanelItem>
        }
    let panelItems=  { PanelItems = ListModel.Create (fun item ->item.Key) [] }
    let collectFreeSpace (rcContainer:Rect) (except:PanelItem)= 
                                              panelItems.PanelItems
                                              |>List.ofSeq 
                                              |>List.filter (fun item -> item.Key <> except.Key)
                                              |>List.fold (fun (acc:Rect list) panel -> 
                                                                      let rcPanel = ((Rect.fromDomRect panel.panel.element.Value)
                                                                                      .offset panel.panel.lastLeft.Value panel.panel.lastTop.Value)
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

    let RenderPanelItem (haItem:PanelItem) =     
        let newPanel = 
            (haItem.panel.panelAttr
                    [Attr.Style "Width" "150px"]
                    [Attr.Class "panelTitle"]
                    [tableAttr [Attr.Style "width" "100%"]
                         [tr[
                            td[text haItem.name]
                            tdAttr[Attr.Style "text-align" "right"]
                              [iAttr[Attr.Class "material-icons orange600"
                                     Attr.Style "cursor" "pointer"
                                     on.mouseDown (fun _ _->panelItems.PanelItems.Remove(haItem)
                                                            )][text "clear"]
                                                                  ]
                            ]]
                    ]
                    (divAttr
                        [Attr.Class "panelContent"]
                        [text "Content"])).OnAfterRender((fun el -> 
                            let rcPanel=Rect.fromDomRect el
                            let rcContainer = Rect.fromDomRect el.ParentElement
                            Console.Log ("Add panel: " + rcPanel.ToString() + " " + rcContainer.ToString())       
                            let foundCandidate=
                                collectFreeSpace rcContainer haItem
                                |>List.tryFind (fun rc -> 
                                          Console.Log ("Finds free rect: " + rc.ToString())             
                                          rc.width >= rcPanel.width && rc.height >= rcPanel.height)
                            match foundCandidate with 
                            |None->()
                            |Some(rc)->
                                  haItem.panel.lastLeft.Value <- rc.left + 5.0
                                  haItem.panel.lastTop.Value <- rc.top + 5.0
                                 // haItem.panel.moveTo.Value <- (rc.left,rc.top)
 
                        
                        ))
        newPanel

    let Main () =
        let listPanels=
                    ListModel.View panelItems.PanelItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (RenderPanelItem)
        let panelContainer = 
                        divAttr[ Attr.Style "border" "1px solid white"
                                 Attr.Style "Width" "800px"
                                 Attr.Style "Height" "400px"
                                 Attr.Style "left" "0px"
                                 Attr.Style "top" "0px"
                                 Attr.Style "position" "relative"
                        ][listPanels]
        div [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"][
                        table
                             [
                                trAttr[Attr.Style "Height" "100%"]
                                  [
                                    tdAttr[Attr.Style "Height" "100%"]  [
                                                iAttr[Attr.Class "material-icons orange600"][text "dehaze"]
                                              ]
                                    
                                  ]
                                tr[td[iAttr[Attr.Class "material-icons orange600"
                                            Attr.Style "cursor" "pointer"
                                            on.mouseDown (fun _ _->let z_index=(panelItems.PanelItems |>List.ofSeq).Length + 1
                                                                   let newItem=PanelItem.Create ("Panel " + z_index.ToString()) z_index
                                                                   panelItems.PanelItems.Add  newItem 
                                                                   )][text "add"]
                                      ]]
                             ]
                      ]
                    td[
                         panelContainer
                      ]
                  ]
            ]
        ]
