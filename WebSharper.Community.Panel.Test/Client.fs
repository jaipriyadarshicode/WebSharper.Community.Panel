namespace WebSharper.Community.Panel.Test


open WebSharper
open WebSharper.JavaScript
open WebSharper.UI.Next
open WebSharper.UI.Next.Client
open WebSharper.UI.Next.Html
open WebSharper.Community.Panel

[<JavaScript>]
module Client =

    let panelContainer=PanelContainer.Create
                                     .WithWidth(400.0).WithHeight(400.0)
                                     .WithLayoutManager(LayoutManagers.FloatingPanelLayoutManager 5.0)
                                     //.WithLayoutManager(LayoutManagers.StackPanelLayoutManager)
                                     .WithAttributes(
                                        [
                                             Attr.Style "border" "1px solid white"
                                             Attr.Style "left" "0px"
                                             Attr.Style "top" "0px"
                                             Attr.Style "position" "relative"
                                        ])
    let Main () =
        div [
            table[
                tr[
                    tdAttr [Attr.Style "vertical-align" "top"][
                        table
                             [
                                trAttr[Attr.Style "Height" "100%"]
                                  [
                                    tdAttr[Attr.Style "Height" "100%"]
                                          [iAttr[Attr.Class "material-icons orange600"]
                                                [text "dehaze"]
                                          ]
                                  ]
                                tr[td[iAttr[Attr.Class "material-icons orange600"
                                            Attr.Style "cursor" "pointer"
                                            on.mouseDown (fun _ _->let z_index=(panelContainer.PanelItems |>List.ofSeq).Length + 1
                                                                   let panel=Panel.Create
                                                                                  .WithPannelAttrs([Attr.Style "Width" "150px"])
                                                                                  .WithTitleContent(text ("Panel "+z_index.ToString()))
                                                                                  .WithTitleButtons(
                                                                                               [
                                                                                                 {Icon="add";Action=(fun panel->())}
                                                                                                 {Icon="edit";Action=(fun panel->())}
                                                                                                 {Icon="clear";Action=(fun panel->panelContainer.PanelItems.Remove(panelContainer.FindPanelItem panel))}
                                                                                               ])
                                                                                  .WithPanelContent(divAttr[Attr.Class "panelContent"][text "Content"])
                                                                   panelContainer.AddPanel panel
                                                                   )][text "add"]
                                      ]]
                             ]
                      ]
                    td[panelContainer.Render]
                  ]
            ]
        ]
