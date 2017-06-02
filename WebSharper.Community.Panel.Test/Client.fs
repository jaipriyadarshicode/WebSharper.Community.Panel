namespace WebSharper.Community.Panel.Test

open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel.Library

[<JavaScript>]
module Client =

    type PanelItem =
        {
            Key:Key
            z_index : int
            name : string
            left :Var<double>
            top : Var<double>
            panel:PanelInstance
        }
        static member Create name z_index=
            {   
                Key=Key.Fresh()
                name = name
                z_index = z_index
                left = Var.Create 0.0
                top = Var.Create 0.0
                panel = PanelInstance.Create
            }
    type PanelModel =
        {
            PanelItems : ListModel<Key,PanelItem>
        }
    let RenderPanelItem (haItem:PanelItem) =      
            haItem.panel.panelAttr
                    [Attr.Style "Width" "150px"]
                    [Attr.Class "panelTitle"]
                    [text haItem.name]
                    (divAttr
                        [Attr.Class "panelContent"]
                        [text "Content"])
    let panelItems=  { PanelItems = ListModel.Create (fun item ->item.Key) [] }
    let Main () =
        let listPanels=
                    ListModel.View panelItems.PanelItems
                    |> Doc.BindSeqCachedBy (fun m -> m.Key) (RenderPanelItem)
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
                        divAttr[ Attr.Style "border" "1px solid white"
                                 Attr.Style "Width" "800px"
                                 Attr.Style "Height" "400px"
                                 Attr.Style "left" "0px"
                                 Attr.Style "top" "0px"
                                 Attr.Style "position" "relative"
                        ][listPanels]
                      ]
                  ]
            ]
        ]
